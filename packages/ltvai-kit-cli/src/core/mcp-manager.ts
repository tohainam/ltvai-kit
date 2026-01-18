import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MCPConfig, PlatformStrategy } from '../types/index.js';
import { pathExists } from '../utils/fs-utils.js';
import { logInfo, logSuccess, logWarning } from '../ui/prompts.js';

/**
 * Read MCP config from file
 */
export function readMCPConfig(filePath: string): MCPConfig {
  if (!pathExists(filePath)) {
    return { mcpServers: {} };
  }

  try {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as MCPConfig;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to read MCP config: ${errorMessage}`);
  }
}

/**
 * Write MCP config to file
 */
export function writeMCPConfig(filePath: string, config: MCPConfig, dry: boolean = false): void {
  if (dry) {
    logInfo(`[DRY RUN] Would write MCP config to ${filePath}`);
    logInfo(`[DRY RUN] Servers: ${Object.keys(config.mcpServers).join(', ')}`);
    return;
  }

  try {
    const content = JSON.stringify(config, null, 2);
    writeFileSync(filePath, content, 'utf-8');
    logSuccess(`Written MCP config to ${filePath}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to write MCP config: ${errorMessage}`);
  }
}

/**
 * Filter MCP servers by selected names
 */
export function filterMCPServers(config: MCPConfig, selectedServers: string[]): MCPConfig {
  const filtered: MCPConfig = { mcpServers: {} };

  for (const name of selectedServers) {
    if (config.mcpServers[name]) {
      filtered.mcpServers[name] = config.mcpServers[name];
    }
  }

  return filtered;
}

/**
 * Merge MCP configs (existing + new)
 */
export function mergeMCPConfigs(existing: MCPConfig, incoming: MCPConfig): MCPConfig {
  return {
    mcpServers: {
      ...existing.mcpServers,
      ...incoming.mcpServers,
    },
  };
}

/**
 * Get available MCP servers from example config
 */
export function getAvailableMCPServers(sourceDir: string): MCPConfig {
  const examplePath = join(sourceDir, '.mcp.example.json');

  if (!pathExists(examplePath)) {
    logWarning('.mcp.example.json not found in source');
    return { mcpServers: {} };
  }

  return readMCPConfig(examplePath);
}

/**
 * Setup MCP config for a platform
 */
export async function setupMCPConfig(
  sourceDir: string,
  targetDir: string,
  selectedServers: string[],
  strategy: PlatformStrategy,
  dry: boolean = false
): Promise<void> {
  // Read example config from source
  const availableConfig = getAvailableMCPServers(sourceDir);

  // Filter to selected servers
  const filteredConfig = filterMCPServers(availableConfig, selectedServers);

  // Transform for platform
  const transformedConfig = strategy.transformMCPConfig(filteredConfig);

  // Determine target path
  const targetPath = join(targetDir, strategy.mcpConfigPath);

  // Check for existing config
  if (pathExists(targetPath)) {
    const existingConfig = readMCPConfig(targetPath);
    const mergedConfig = mergeMCPConfigs(existingConfig, transformedConfig);
    writeMCPConfig(targetPath, mergedConfig, dry);
  } else {
    writeMCPConfig(targetPath, transformedConfig, dry);
  }
}
