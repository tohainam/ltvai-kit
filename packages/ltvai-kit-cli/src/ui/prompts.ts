import * as p from '@clack/prompts';
import { Platform, MCPConfig } from '../types/index.js';
import pc from 'picocolors';

/**
 * Ask for target path
 */
export async function askTargetPath(defaultPath: string): Promise<string> {
  const result = await p.text({
    message: 'Where do you want to setup LTVAI Kit?',
    placeholder: defaultPath,
    initialValue: defaultPath,
    validate: (value) => {
      if (!value) return 'Please enter a path';
      return undefined;
    },
  });

  if (p.isCancel(result)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  return result;
}

/**
 * Ask for platforms to configure
 */
export async function askPlatforms(): Promise<Platform[]> {
  const result = await p.multiselect({
    message: 'Select platforms to configure:',
    options: [
      {
        value: 'claude-code' as Platform,
        label: 'Claude Code (.claude)',
        hint: 'Recommended',
      },
      {
        value: 'antigravity' as Platform,
        label: 'Antigravity (.agent)',
        hint: 'Coming soon',
      },
    ],
    initialValues: ['claude-code'] as Platform[],
    required: true,
  });

  if (p.isCancel(result)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  return result as Platform[];
}

/**
 * Ask for MCP servers to install
 */
export async function askMCPServers(availableServers: MCPConfig): Promise<string[]> {
  const serverNames = Object.keys(availableServers.mcpServers);

  if (serverNames.length === 0) {
    return [];
  }

  const result = await p.multiselect({
    message: 'Select MCP servers to install:',
    options: serverNames.map((name) => ({
      value: name,
      label: name,
      hint: availableServers.mcpServers[name].type,
    })),
    initialValues: serverNames,
    required: false,
  });

  if (p.isCancel(result)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  return result as string[];
}

/**
 * Ask what to do with existing config
 */
export async function askExistingConfig(configPath: string): Promise<'overwrite' | 'merge' | 'cancel'> {
  const result = await p.select({
    message: `Existing ${configPath} folder found. What do you want to do?`,
    options: [
      { value: 'overwrite', label: 'Overwrite', hint: 'Replace existing config' },
      { value: 'merge', label: 'Merge', hint: 'Keep existing, add new' },
      { value: 'cancel', label: 'Cancel', hint: 'Abort operation' },
    ],
  });

  if (p.isCancel(result) || result === 'cancel') {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  return result as 'overwrite' | 'merge';
}

/**
 * Confirm action
 */
export async function confirm(message: string): Promise<boolean> {
  const result = await p.confirm({
    message,
    initialValue: true,
  });

  if (p.isCancel(result)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  return result;
}

/**
 * Show intro message
 */
export function intro(message: string): void {
  p.intro(pc.bgGreen(pc.black(` ${message} `)));
}

/**
 * Show outro message
 */
export function outro(message: string): void {
  p.outro(pc.green(message));
}

/**
 * Show note
 */
export function note(message: string, title?: string): void {
  p.note(message, title);
}

/**
 * Log message
 */
export function logMessage(message: string): void {
  p.log.message(message);
}

/**
 * Log info
 */
export function logInfo(message: string): void {
  p.log.info(message);
}

/**
 * Log success
 */
export function logSuccess(message: string): void {
  p.log.success(message);
}

/**
 * Log warning
 */
export function logWarning(message: string): void {
  p.log.warn(message);
}

/**
 * Log error
 */
export function logError(message: string): void {
  p.log.error(message);
}

/**
 * Log step
 */
export function logStep(message: string): void {
  p.log.step(message);
}
