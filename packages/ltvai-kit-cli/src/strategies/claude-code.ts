import { join } from 'node:path';
import { PlatformStrategy, MCPConfig, ValidationResult } from '../types/index.js';
import { copyDirWithExclusions, pathExists } from '../utils/fs-utils.js';
import { logInfo, logSuccess, logWarning } from '../ui/prompts.js';

export const claudeCodeStrategy: PlatformStrategy = {
  name: 'claude-code',
  displayName: 'Claude Code',
  configFolder: '.claude',
  mcpConfigPath: '.mcp.json',
  available: true,

  async copyConfig(source: string, target: string, dry: boolean): Promise<void> {
    const sourceDir = join(source, '.claude');
    const targetDir = join(target, '.claude');

    // Check dry mode first before accessing source
    if (dry) {
      logInfo(`[DRY RUN] Would copy ${sourceDir} to ${targetDir}`);
      return;
    }

    if (!pathExists(sourceDir)) {
      throw new Error(`Source .claude folder not found at ${sourceDir}`);
    }

    const { copied, skipped } = copyDirWithExclusions(sourceDir, targetDir, dry);

    if (copied.length > 0) {
      logSuccess(`Copied ${copied.length} files to ${targetDir}`);
    }
    if (skipped.length > 0) {
      logWarning(`Skipped ${skipped.length} files (excluded patterns)`);
    }
  },

  transformMCPConfig(config: MCPConfig): MCPConfig {
    // Claude Code uses the config as-is
    return config;
  },

  async validate(targetPath: string): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    const configPath = join(targetPath, '.claude');
    if (!pathExists(configPath)) {
      errors.push('.claude folder not found');
    }

    const settingsPath = join(configPath, 'settings.json');
    if (!pathExists(settingsPath)) {
      warnings.push('settings.json not found in .claude');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  },
};
