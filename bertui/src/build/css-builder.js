// src/build/css-builder.js
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import logger from '../logger/logger.js';

/**
 * Build and minify CSS for production
 * @param {string} srcPath - Source CSS file path
 * @param {string} destPath - Destination CSS file path
 */
export async function buildCSS(srcPath, destPath) {
  try {
    logger.info('Processing CSS...');
    
    // Ensure destination directory exists
    const destDir = join(destPath, '..');
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }
    
    // Read source CSS
    const css = await Bun.file(srcPath).text();
    
    // Process with PostCSS
    const result = await postcss([
      autoprefixer(),
      cssnano({
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          colormin: true,
          minifyFontValues: true,
          minifySelectors: true,
        }]
      })
    ]).process(css, { from: srcPath, to: destPath });
    
    // Write minified CSS
    await Bun.write(destPath, result.css);
    
    // Calculate size reduction
    const originalSize = (Buffer.byteLength(css) / 1024).toFixed(2);
    const minifiedSize = (Buffer.byteLength(result.css) / 1024).toFixed(2);
    const reduction = ((1 - Buffer.byteLength(result.css) / Buffer.byteLength(css)) * 100).toFixed(1);
    
    logger.success(`CSS minified: ${originalSize}KB → ${minifiedSize}KB (-${reduction}%)`);
    
    if (result.warnings().length > 0) {
      result.warnings().forEach(warn => {
        logger.warn(warn.toString());
      });
    }
    
    return { success: true, size: minifiedSize };
  } catch (error) {
    logger.error(`CSS build failed: ${error.message}`);
    throw error;
  }
}

/**
 * Copy CSS without minification (for dev)
 * @param {string} srcPath - Source CSS file path
 * @param {string} destPath - Destination CSS file path
 */
export async function copyCSS(srcPath, destPath) {
  try {
    const destDir = join(destPath, '..');
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }
    
    await Bun.write(destPath, Bun.file(srcPath));
    logger.info('CSS copied for development');
    
    return { success: true };
  } catch (error) {
    logger.error(`CSS copy failed: ${error.message}`);
    throw error;
  }
}