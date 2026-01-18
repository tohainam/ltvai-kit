import { join } from 'node:path';
import { homedir } from 'node:os';
import { PlatformStrategy, MCPConfig, ValidationResult } from '../types/index.js';
import { logInfo, logWarning } from '../ui/prompts.js';

export const antigravityStrategy: PlatformStrategy = {
  name: 'antigravity',
  displayName: 'Antigravity',
  configFolder: '.agent',
  mcpConfigPath: join(homedir(), '.gemini', 'antigravity', 'mcp_config.json'),
  available: false, // Coming soon

  async copyConfig(_source: string, _target: string, dry: boolean): Promise<void> {
    logWarning('Antigravity support is coming soon!');

    // Placeholder for future implementation
    // const sourceDir = join(source, '.agent');
    // const targetDir = join(target, '.agent');

    if (dry) {
      logInfo('[DRY RUN] Would setup Antigravity config (not yet implemented)');
      return;
    }

    // Future: Copy .agent folder when available
  },

  transformMCPConfig(config: MCPConfig): MCPConfig {
    // Antigravity uses different MCP format
    // Transform url → serverUrl for HTTP servers
    const transformed: MCPConfig = {
      mcpServers: {},
    };

    for (const [name, server] of Object.entries(config.mcpServers)) {
      if (server.type === 'http' && server.url) {
        transformed.mcpServers[name] = {
          ...server,
          serverUrl: server.url,
          url: undefined,
        };
      } else {
        transformed.mcpServers[name] = { ...server };
      }
    }

    return transformed;
  },

  async validate(_targetPath: string): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    warnings.push('Antigravity support is coming soon');

    return {
      valid: true, // Always valid since it's not implemented yet
      errors,
      warnings,
    };
  },
};
