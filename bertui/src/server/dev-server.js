// src/server/dev-server.js
import { Elysia } from 'elysia';
import { watch } from 'fs';
import { join, extname } from 'path';
import { existsSync } from 'fs';
import logger from '../logger/logger.js';
import { compileProject } from '../client/compiler.js';

export async function startDevServer(options = {}) {
  const port = parseInt(options.port) || 3000;
  const root = options.root || process.cwd();
  const compiledDir = join(root, '.bertui', 'compiled');
  
  const clients = new Set();
  let hasRouter = false;
  
  // Check if router exists
  const routerPath = join(compiledDir, 'router.js');
  if (existsSync(routerPath)) {
    hasRouter = true;
    logger.info('Router-based routing enabled');
  }
  
  const app = new Elysia()
    // Main HTML route - serves all pages
    .get('/', async () => {
      return serveHTML(root, hasRouter);
    })
    
    // Catch-all route for SPA routing
    .get('/*', async ({ params, set }) => {
      const path = params['*'];
      
      // Check if it's a file request
      if (path.includes('.')) {
        // Try to serve as static file
        const filePath = join(compiledDir, path);
        const file = Bun.file(filePath);
        
        if (await file.exists()) {
          const ext = extname(path);
          const contentType = getContentType(ext);
          
          return new Response(await file.text(), {
            headers: { 
              'Content-Type': contentType,
              'Cache-Control': 'no-store'
            }
          });
        }
        
        set.status = 404;
        return 'File not found';
      }
      
      // For non-file routes, serve the main HTML (SPA mode)
      return serveHTML(root, hasRouter);
    })
    
    .get('/hmr-client.js', () => {
      const script = `
const ws = new WebSocket('ws://localhost:${port}/hmr');

ws.onopen = () => {
  console.log('%c🔥 BertUI HMR connected', 'color: #10b981; font-weight: bold');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'reload') {
    console.log('%c🔄 Reloading...', 'color: #f59e0b');
    window.location.reload();
  }
  
  if (data.type === 'recompiling') {
    console.log('%c⚙️ Recompiling...', 'color: #3b82f6');
  }
};

ws.onerror = (error) => {
  console.error('%c❌ HMR connection error', 'color: #ef4444', error);
};

ws.onclose = () => {
  console.log('%c⚠️ HMR disconnected. Refresh to reconnect.', 'color: #f59e0b');
};
`;
      
      return new Response(script, {
        headers: { 'Content-Type': 'application/javascript' }
      });
    })
    
    .ws('/hmr', {
      open(ws) {
        clients.add(ws);
        logger.info('Client connected to HMR');
      },
      close(ws) {
        clients.delete(ws);
        logger.info('Client disconnected from HMR');
      }
    })
    
    // Serve BertUI CSS
    .get('/styles/bertui.css', async ({ set }) => {
      const cssPath = join(import.meta.dir, '../styles/bertui.css');
      const file = Bun.file(cssPath);
      
      if (!await file.exists()) {
        set.status = 404;
        return 'CSS file not found';
      }
      
      return new Response(await file.text(), {
        headers: { 
          'Content-Type': 'text/css',
          'Cache-Control': 'no-store'
        }
      });
    })
    
    // Serve compiled files
    .get('/compiled/*', async ({ params, set }) => {
      const filepath = join(compiledDir, params['*']);
      const file = Bun.file(filepath);
      
      if (!await file.exists()) {
        set.status = 404;
        return 'File not found';
      }
      
      const ext = extname(filepath);
      const contentType = getContentType(ext);
      
      return new Response(await file.text(), {
        headers: { 
          'Content-Type': contentType,
          'Cache-Control': 'no-store'
        }
      });
    })
    
    // Serve public assets
    .get('/public/*', async ({ params, set }) => {
      const publicDir = join(root, 'public');
      const filepath = join(publicDir, params['*']);
      const file = Bun.file(filepath);
      
      if (!await file.exists()) {
        set.status = 404;
        return 'File not found';
      }
      
      return new Response(file);
    })
    
    .listen(port);
  
  if (!app.server) {
    logger.error('Failed to start server');
    process.exit(1);
  }
  
  logger.success(`🚀 Server running at http://localhost:${port}`);
  logger.info(`📁 Serving: ${root}`);
  
  // Watch for file changes
  setupWatcher(root, compiledDir, clients, () => {
    // Check router status on recompile
    hasRouter = existsSync(join(compiledDir, 'router.js'));
  });
  
  return app;
}

function serveHTML(root, hasRouter) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BertUI App - Dev</title>
  <link rel="stylesheet" href="/styles/bertui.css">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/hmr-client.js"></script>
  ${hasRouter 
    ? '<script type="module" src="/compiled/router.js"></script>' 
    : ''
  }
  <script type="module" src="/compiled/main.js"></script>
</body>
</html>`;
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

function getContentType(ext) {
  const types = {
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
  };
  
  return types[ext] || 'text/plain';
}

function setupWatcher(root, compiledDir, clients, onRecompile) {
  const srcDir = join(root, 'src');
  
  if (!existsSync(srcDir)) {
    logger.warn('src/ directory not found');
    return;
  }
  
  logger.info(`👀 Watching: ${srcDir}`);
  
  watch(srcDir, { recursive: true }, async (eventType, filename) => {
    if (!filename) return;
    
    const ext = extname(filename);
    if (['.js', '.jsx', '.ts', '.tsx', '.css'].includes(ext)) {
      logger.info(`📝 File changed: ${filename}`);
      
      // Notify clients that recompilation is starting
      for (const client of clients) {
        try {
          client.send(JSON.stringify({ type: 'recompiling' }));
        } catch (e) {
          clients.delete(client);
        }
      }
      
      // Recompile the project
      try {
        await compileProject(root);
        
        // Call callback to update router status
        if (onRecompile) {
          onRecompile();
        }
        
        // Notify clients to reload
        for (const client of clients) {
          try {
            client.send(JSON.stringify({ type: 'reload', file: filename }));
          } catch (e) {
            clients.delete(client);
          }
        }
      } catch (error) {
        logger.error(`Recompilation failed: ${error.message}`);
      }
    }
  });
}