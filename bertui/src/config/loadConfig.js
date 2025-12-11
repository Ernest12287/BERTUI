// src/config/loadConfig.js
import { join } from 'path';
import { existsSync } from 'fs';
import { defaultConfig } from './defaultConfig.js';
import logger from '../logger/logger.js';

export async function loadConfig(root) {
  const configPath = join(root, 'bertui.config.js');
  
  // Check if user created config
  if (existsSync(configPath)) {
    try {
      const userConfig = await import(configPath);
      logger.success('Loaded bertui.config.js');
      
      // Merge user config with defaults
      return mergeConfig(defaultConfig, userConfig.default || userConfig);
    } catch (error) {
      logger.error(`Failed to load config. Make sure bertui.config.js is in the root directory: ${error.message}`);
      return defaultConfig;
    }
  }
  
  logger.info('No config found, using defaults');
  return defaultConfig;
}

function mergeConfig(defaults, user) {
  return {
    meta: { ...defaults.meta, ...(user.meta || {}) },
    appShell: { ...defaults.appShell, ...(user.appShell || {}) }
  };
}