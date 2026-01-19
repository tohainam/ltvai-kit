import { Platform, PlatformStrategy } from '../types/index.js';

/**
 * Get platform strategy by name
 */
export function getPlatformStrategy(platform: Platform): PlatformStrategy {
  switch (platform) {
    case 'claude-code':
      // Lazy import to avoid circular dependencies
      return require('./claude-code.js').claudeCodeStrategy;
    case 'copilot':
      return require('./copilot-chat.js').copilotChatStrategy;
    default:
      throw new Error(`Unknown platform: ${platform}`);
  }
}

/**
 * Get all available platforms
 */
export function getAvailablePlatforms(): PlatformStrategy[] {
  const { claudeCodeStrategy } = require('./claude-code.js');
  const { copilotChatStrategy } = require('./copilot-chat.js');
  return [claudeCodeStrategy, copilotChatStrategy];
}
