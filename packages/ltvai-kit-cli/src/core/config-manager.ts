import { join } from 'node:path';
import { Platform, InitOptions, UpdateOptions } from '../types/index.js';
import { cloneRepo, cleanupTempDir, isGitAvailable } from './git-manager.js';
import { getAvailableMCPServers, setupMCPConfig } from './mcp-manager.js';
import { claudeCodeStrategy } from '../strategies/claude-code.js';
import { antigravityStrategy } from '../strategies/antigravity.js';
import { pathExists, createBackup, ensureDir } from '../utils/fs-utils.js';
import { runTasks } from '../ui/spinner.js';
import {
  askTargetPath,
  askPlatforms,
  askMCPServers,
  askExistingConfig,
  logInfo,
  logSuccess,
  logWarning,
  logError,
  note,
} from '../ui/prompts.js';

/**
 * Get platform strategy by name
 */
function getStrategy(platform: Platform) {
  switch (platform) {
    case 'claude-code':
      return claudeCodeStrategy;
    case 'antigravity':
      return antigravityStrategy;
    default:
      throw new Error(`Unknown platform: ${platform}`);
  }
}

/**
 * Run init workflow
 */
export async function runInit(options: InitOptions): Promise<void> {
  const { dry, branch, force } = options;
  let { path: targetPath } = options;

  // Check git availability
  if (!isGitAvailable()) {
    logError('Git is not installed or not in PATH');
    process.exit(1);
  }

  // Ask for target path if not provided or default
  if (targetPath === process.cwd()) {
    targetPath = await askTargetPath(targetPath);
  }

  // Ask for platforms
  const platforms = await askPlatforms();

  // Filter to available platforms
  const availablePlatforms = platforms.filter((p) => {
    const strategy = getStrategy(p);
    if (!strategy.available) {
      logWarning(`${strategy.displayName} is not yet available, skipping...`);
      return false;
    }
    return true;
  });

  if (availablePlatforms.length === 0) {
    logError('No available platforms selected');
    process.exit(1);
  }

  // Check for existing config
  for (const platform of availablePlatforms) {
    const strategy = getStrategy(platform);
    const configPath = join(targetPath, strategy.configFolder);

    if (pathExists(configPath) && !force) {
      const action = await askExistingConfig(strategy.configFolder);
      if (action === 'cancel') {
        process.exit(0);
      }
      // For 'overwrite' or 'merge', we continue
    }
  }

  // Clone repo
  let tempDir = '';

  await runTasks([
    {
      title: `Cloning repository (branch: ${branch})`,
      task: async (message) => {
        message('Connecting to GitHub...');
        tempDir = await cloneRepo(branch, dry);
        message('Repository cloned');
      },
    },
  ]);

  try {
    // Get available MCP servers
    const availableMCP = dry ? { mcpServers: {} } : getAvailableMCPServers(tempDir);
    const serverNames = Object.keys(availableMCP.mcpServers);

    // Ask for MCP servers if available
    let selectedServers: string[] = [];
    if (serverNames.length > 0) {
      selectedServers = await askMCPServers(availableMCP);
    }

    // Run setup tasks for each platform
    await runTasks(
      availablePlatforms.map((platform) => ({
        title: `Setting up ${getStrategy(platform).displayName}`,
        task: async (message) => {
          const strategy = getStrategy(platform);

          // Copy config
          message('Copying configuration files...');
          await strategy.copyConfig(tempDir, targetPath, dry);

          // Setup MCP if servers selected
          if (selectedServers.length > 0 && strategy.available) {
            message('Setting up MCP servers...');
            await setupMCPConfig(tempDir, targetPath, selectedServers, strategy, dry);
          }
        },
      }))
    );

    // Create .specs directory
    const specsDir = join(targetPath, '.specs');
    if (!pathExists(specsDir) && !dry) {
      ensureDir(specsDir);
      logInfo('Created .specs directory for specification files');
    }

    // Show next steps
    note(
      `1. cd ${targetPath}\n2. Review .claude/settings.json\n3. Configure MCP servers in .mcp.json`,
      'Next steps'
    );

    logSuccess('Setup complete!');
  } finally {
    // Cleanup temp directory
    if (tempDir && !dry) {
      cleanupTempDir(tempDir, dry);
    }
  }
}

/**
 * Run update workflow
 */
export async function runUpdate(options: UpdateOptions): Promise<void> {
  const { dry, branch, backup } = options;
  let { path: targetPath } = options;

  // Check git availability
  if (!isGitAvailable()) {
    logError('Git is not installed or not in PATH');
    process.exit(1);
  }

  // Ask for target path if not provided
  if (targetPath === process.cwd()) {
    targetPath = await askTargetPath(targetPath);
  }

  // Check for existing config
  const claudeConfigPath = join(targetPath, '.claude');
  if (!pathExists(claudeConfigPath)) {
    logError('No existing .claude configuration found. Run "init" first.');
    process.exit(1);
  }

  // Create backup if enabled
  if (backup && !dry) {
    const backupPath = createBackup(claudeConfigPath);
    logSuccess(`Backup created at ${backupPath}`);
  }

  // Clone repo
  let tempDir = '';

  await runTasks([
    {
      title: `Cloning repository (branch: ${branch})`,
      task: async (message) => {
        message('Connecting to GitHub...');
        tempDir = await cloneRepo(branch, dry);
        message('Repository cloned');
      },
    },
    {
      title: 'Updating Claude Code configuration',
      task: async (message) => {
        message('Copying updated files...');
        await claudeCodeStrategy.copyConfig(tempDir, targetPath, dry);
      },
    },
  ]);

  // Cleanup
  if (tempDir && !dry) {
    cleanupTempDir(tempDir, dry);
  }

  logSuccess('Update complete!');
}
