// src/build.js
import { join } from 'path';
import { existsSync, mkdirSync, rmSync, cpSync } from 'fs';
import logger from './logger/logger.js';
import { buildCSS } from './build/css-builder.js';

export async function buildProduction(options = {}) {
  const root = options.root || process.cwd();
  const outDir = join(root, 'dist');
  
  logger.bigLog('BUILDING FOR PRODUCTION', { color: 'green' });
  
  // Clean dist folder
  if (existsSync(outDir)) {
    rmSync(outDir, { recursive: true });
    logger.info('Cleaned dist/');
  }
  mkdirSync(outDir, { recursive: true });
  
  const startTime = Date.now();
  
  try {
    // Step 1: Build CSS from BertUI library
    logger.info('Step 1: Building CSS...');
    const bertuiCssSource = join(import.meta.dir, 'styles/bertui.css');
    const bertuiCssDest = join(outDir, 'styles/bertui.min.css');
    await buildCSS(bertuiCssSource, bertuiCssDest);
    
    // Step 2: Copy public assets if they exist
    const publicDir = join(root, 'public');
    if (existsSync(publicDir)) {
      logger.info('Step 2: Copying public assets...');
      cpSync(publicDir, outDir, { recursive: true });
      logger.success('Public assets copied');
    } else {
      logger.info('Step 2: No public directory found, skipping...');
    }
    
    // Step 3: Build JavaScript with Bun's bundler
    logger.info('Step 3: Bundling JavaScript...');
    const mainEntry = join(root, 'src/main.jsx');
    
    if (!existsSync(mainEntry)) {
      logger.error('Entry point not found: src/main.jsx');
      process.exit(1);
    }
    
    const result = await Bun.build({
      entrypoints: [mainEntry],
      outdir: join(outDir, 'assets'),
      target: 'browser',
      minify: true,
      splitting: true,
      sourcemap: 'external',
      naming: {
        entry: '[name]-[hash].js',
        chunk: 'chunks/[name]-[hash].js',
        asset: '[name]-[hash].[ext]'
      },
      external: [] // Don't externalize anything for browser builds
    });
    
    if (!result.success) {
      logger.error('JavaScript build failed!');
      result.logs.forEach(log => logger.error(log.message));
      process.exit(1);
    }
    
    logger.success('JavaScript bundled');
    
    // Step 4: Generate index.html
    logger.info('Step 4: Generating index.html...');
    await generateProductionHTML(root, outDir, result);
    
    const duration = Date.now() - startTime;
    logger.success(`✨ Build complete in ${duration}ms`);
    logger.info(`📦 Output: ${outDir}`);
    
    // Display build stats
    logger.table(result.outputs.map(o => ({
      file: o.path.replace(outDir, ''),
      size: `${(o.size / 1024).toFixed(2)} KB`
    })));
    
  } catch (error) {
    logger.error(`Build failed: ${error.message}`);
    if (error.stack) {
      logger.error(error.stack);
    }
    process.exit(1);
  }
}

async function generateProductionHTML(root, outDir, buildResult) {
  // Find the main bundle
  const mainBundle = buildResult.outputs.find(o => 
    o.path.includes('main') && o.kind === 'entry-point'
  );
  
  if (!mainBundle) {
    throw new Error('Could not find main bundle in build output');
  }
  
  const bundlePath = mainBundle.path.replace(outDir, '').replace(/^\//, '');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Built with BertUI - Lightning fast React development">
  <title>BertUI App</title>
  <link rel="stylesheet" href="/styles/bertui.min.css">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/${bundlePath}"></script>
</body>
</html>`;
  
  await Bun.write(join(outDir, 'index.html'), html);
  logger.success('Generated index.html');
}