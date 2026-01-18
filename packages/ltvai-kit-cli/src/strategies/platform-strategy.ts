import { Platform, PlatformStrategy } from '../types/index.js';

/**
 * Get platform strategy by name
 */
export function getPlatformStrategy(platform: Platform): PlatformStrategy {
  switch (platform) {
    case 'claude-code':
      // Lazy import to avoid circular dependencies
      return require('./claude-code.js').claudeCodeStrategy;
    case 'antigravity':
      return require('./antigravity.js').antigravityStrategy;
    default:
      throw new Error(`Unknown platform: ${platform}`);
  }
}

/**
 * Get all available platforms
 */
export function getAvailablePlatforms(): PlatformStrategy[] {
  const { claudeCodeStrategy } = require('./claude-code.js');
  const { antigravityStrategy } = require('./antigravity.js');
  return [claudeCodeStrategy, antigravityStrategy];
}
