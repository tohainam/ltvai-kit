import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { PlatformStrategy, MCPConfig, ValidationResult } from '../types/index.js';
import { copyDirWithExclusions, pathExists, copyFileSync } from '../utils/fs-utils.js';
import { logInfo, logSuccess, logWarning } from '../ui/prompts.js';

export const copilotChatStrategy: PlatformStrategy = {
  name: 'copilot',
  displayName: 'GitHub Copilot Chat',
  configFolder: '.vscode',
  mcpConfigPath: '.vscode/mcp.json',
  available: true,

  async copyConfig(source: string, target: string, dry: boolean): Promise<void> {
    // 1. Copy .github/prompts/ folder
    const sourcePromptsDir = join(source, '.github', 'prompts');
    const targetPromptsDir = join(target, '.github', 'prompts');

    if (dry) {
      logInfo(`[DRY RUN] Would copy prompts from ${sourcePromptsDir} to ${targetPromptsDir}`);
    } else if (pathExists(sourcePromptsDir)) {
      // Ensure .github directory exists
      const targetGithubDir = join(target, '.github');
      if (!pathExists(targetGithubDir)) {
        mkdirSync(targetGithubDir, { recursive: true });
      }

      const { copied, skipped } = copyDirWithExclusions(sourcePromptsDir, targetPromptsDir, dry);

      if (copied.length > 0) {
        logSuccess(`Copied ${copied.length} prompt files to ${targetPromptsDir}`);
      }
      if (skipped.length > 0) {
        logWarning(`Skipped ${skipped.length} files (excluded patterns)`);
      }
    } else {
      logWarning('.github/prompts folder not found in source');
    }

    // 2. Copy .github/instructions/ folder if exists
    const sourceInstructionsDir = join(source, '.github', 'instructions');
    const targetInstructionsDir = join(target, '.github', 'instructions');

    if (dry) {
      if (pathExists(sourceInstructionsDir)) {
        logInfo(`[DRY RUN] Would copy instructions from ${sourceInstructionsDir} to ${targetInstructionsDir}`);
      }
    } else if (pathExists(sourceInstructionsDir)) {
      const { copied } = copyDirWithExclusions(sourceInstructionsDir, targetInstructionsDir, dry);
      if (copied.length > 0) {
        logSuccess(`Copied ${copied.length} instruction files to ${targetInstructionsDir}`);
      }
    }

    // 3. Copy .github/copilot-instructions.md if exists
    const sourceCopilotInstructions = join(source, '.github', 'copilot-instructions.md');
    const targetCopilotInstructions = join(target, '.github', 'copilot-instructions.md');

    if (dry) {
      if (pathExists(sourceCopilotInstructions)) {
        logInfo(`[DRY RUN] Would copy ${sourceCopilotInstructions} to ${targetCopilotInstructions}`);
      }
    } else if (pathExists(sourceCopilotInstructions)) {
      // Ensure .github directory exists
      const targetGithubDir = join(target, '.github');
      if (!pathExists(targetGithubDir)) {
        mkdirSync(targetGithubDir, { recursive: true });
      }

      copyFileSync(sourceCopilotInstructions, targetCopilotInstructions);
      logSuccess(`Copied copilot-instructions.md to ${targetCopilotInstructions}`);
    }
  },

  transformMCPConfig(config: MCPConfig): MCPConfig {
    // Return the config as-is since we handle transformation in writeCopilotMCPConfig
    // The actual transformation to Copilot format happens when writing
    return config;
  },

  async validate(targetPath: string): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check .vscode folder
    const vscodeDir = join(targetPath, '.vscode');
    if (!pathExists(vscodeDir)) {
      warnings.push('.vscode folder not found (will be created)');
    }

    // Check .github/prompts folder
    const promptsDir = join(targetPath, '.github', 'prompts');
    if (!pathExists(promptsDir)) {
      warnings.push('.github/prompts folder not found');
    }

    // Check mcp.json
    const mcpConfigPath = join(targetPath, '.vscode', 'mcp.json');
    if (!pathExists(mcpConfigPath)) {
      warnings.push('.vscode/mcp.json not found');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  },
};
