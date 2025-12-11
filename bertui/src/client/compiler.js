// src/client/compiler.js
import { existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, extname, relative, sep } from 'path';
import logger from '../logger/logger.js';

export async function compileProject(root) {
  logger.bigLog('COMPILING PROJECT', { color: 'blue' });
  
  const srcDir = join(root, 'src');
  const pagesDir = join(srcDir, 'pages');
  const outDir = join(root, '.bertui', 'compiled');
  
  // Check if src exists
  if (!existsSync(srcDir)) {
    logger.error('src/ directory not found!');
    process.exit(1);
  }
  
  // Create output directory
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
    logger.info('Created .bertui/compiled/');
  }
  
  // Discover routes if pages directory exists
  let routes = [];
  if (existsSync(pagesDir)) {
    routes = await discoverRoutes(pagesDir);
    logger.info(`Discovered ${routes.length} routes`);
    
    // Display routes table
    if (routes.length > 0) {
      logger.bigLog('ROUTES DISCOVERED', { color: 'blue' });
      logger.table(routes.map((r, i) => ({
        '': i,
        route: r.route,
        file: r.file,
        type: r.type
      })));
      
      // Generate router file
      await generateRouter(routes, outDir);
      logger.info('Generated router.js');
    }
  }
  
  // Compile all files
  const startTime = Date.now();
  const stats = await compileDirectory(srcDir, outDir, root);
  const duration = Date.now() - startTime;
  
  logger.success(`Compiled ${stats.files} files in ${duration}ms`);
  logger.info(`Output: ${outDir}`);
  
  return { outDir, stats, routes };
}

async function discoverRoutes(pagesDir) {
  const routes = [];
  
  async function scanDirectory(dir, basePath = '') {
    const entries = readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const relativePath = join(basePath, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        await scanDirectory(fullPath, relativePath);
      } else if (entry.isFile()) {
        const ext = extname(entry.name);
        if (['.jsx', '.tsx', '.js', '.ts'].includes(ext)) {
          const fileName = entry.name.replace(ext, '');
          
          // Generate route path
          let route = '/' + relativePath.replace(/\\/g, '/').replace(ext, '');
          
          // Handle index files
          if (fileName === 'index') {
            route = route.replace('/index', '') || '/';
          }
          
          // Determine route type
          const isDynamic = fileName.includes('[') && fileName.includes(']');
          const type = isDynamic ? 'dynamic' : 'static';
          
          routes.push({
            route: route === '' ? '/' : route,
            file: relativePath,
            path: fullPath,
            type
          });
        }
      }
    }
  }
  
  await scanDirectory(pagesDir);
  
  // Sort routes: static routes first, then dynamic
  routes.sort((a, b) => {
    if (a.type === b.type) {
      return a.route.localeCompare(b.route);
    }
    return a.type === 'static' ? -1 : 1;
  });
  
  return routes;
}

async function generateRouter(routes, outDir) {
  const imports = routes.map((route, i) => {
    const componentName = `Page${i}`;
    const importPath = `./pages/${route.file.replace(/\\/g, '/')}`;
    return `import ${componentName} from '${importPath}';`;
  }).join('\n');
  
  const routeConfigs = routes.map((route, i) => {
    const componentName = `Page${i}`;
    return `  { path: '${route.route}', component: ${componentName}, type: '${route.type}' }`;
  }).join(',\n');
  
  const routerCode = `// Auto-generated router - DO NOT EDIT
${imports}

export const routes = [
${routeConfigs}
];

export function matchRoute(pathname) {
  // Try exact match first
  for (const route of routes) {
    if (route.type === 'static' && route.path === pathname) {
      return route;
    }
  }
  
  // Try dynamic routes
  for (const route of routes) {
    if (route.type === 'dynamic') {
      const pattern = route.path.replace(/\\[([^\\]]+)\\]/g, '([^/]+)');
      const regex = new RegExp('^' + pattern + '$');
      const match = pathname.match(regex);
      
      if (match) {
        // Extract params
        const paramNames = [...route.path.matchAll(/\\[([^\\]]+)\\]/g)].map(m => m[1]);
        const params = {};
        paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        
        return { ...route, params };
      }
    }
  }
  
  return null;
}
`;
  
  const routerPath = join(outDir, 'router.js');
  await Bun.write(routerPath, routerCode);
}

async function compileDirectory(srcDir, outDir, root) {
  const stats = { files: 0, skipped: 0 };
  
  const files = readdirSync(srcDir);
  
  for (const file of files) {
    const srcPath = join(srcDir, file);
    const stat = statSync(srcPath);
    
    if (stat.isDirectory()) {
      // Recursively compile subdirectories
      const subOutDir = join(outDir, file);
      mkdirSync(subOutDir, { recursive: true });
      const subStats = await compileDirectory(srcPath, subOutDir, root);
      stats.files += subStats.files;
      stats.skipped += subStats.skipped;
    } else {
      // Compile file
      const ext = extname(file);
      const relativePath = relative(join(root, 'src'), srcPath);
      
      if (['.jsx', '.tsx', '.ts'].includes(ext)) {
        await compileFile(srcPath, outDir, file, relativePath);
        stats.files++;
      } else if (ext === '.js' || ext === '.css') {
        // Copy as-is
        const outPath = join(outDir, file);
        await Bun.write(outPath, Bun.file(srcPath));
        logger.debug(`Copied: ${relativePath}`);
        stats.files++;
      } else {
        logger.debug(`Skipped: ${relativePath}`);
        stats.skipped++;
      }
    }
  }
  
  return stats;
}

async function compileFile(srcPath, outDir, filename, relativePath) {
  const ext = extname(filename);
  const loader = ext === '.tsx' ? 'tsx' : ext === '.ts' ? 'ts' : 'jsx';
  
  try {
    const transpiler = new Bun.Transpiler({ loader });
    const code = await Bun.file(srcPath).text();
    const compiled = await transpiler.transform(code);
    
    // Change extension to .js
    const outFilename = filename.replace(/\.(jsx|tsx|ts)$/, '.js');
    const outPath = join(outDir, outFilename);
    
    await Bun.write(outPath, compiled);
    logger.debug(`Compiled: ${relativePath} → ${outFilename}`);
  } catch (error) {
    logger.error(`Failed to compile ${relativePath}: ${error.message}`);
    throw error;
  }
}