/**
 * Supported platforms for configuration
 */
export type Platform = 'claude-code' | 'antigravity';

/**
 * CLI options from command line flags
 */
export interface CLIOptions {
  path: string;
  branch: string;
  dry: boolean;
  force: boolean;
  platforms?: Platform[];
  mcpServers?: string[];
  backup?: boolean;
}

/**
 * User responses from interactive prompts
 */
export interface UserResponses {
  targetPath: string;
  overwriteExisting: boolean;
  platforms: Platform[];
  mcpServers: string[];
}

/**
 * MCP Server configuration (Claude Code format)
 */
export interface MCPServerConfig {
  type: 'stdio' | 'http' | 'sse';
  command?: string;
  args?: string[];
  url?: string;
  serverUrl?: string;
  env?: Record<string, string>;
  headers?: Record<string, string>;
}

/**
 * MCP configuration file structure
 */
export interface MCPConfig {
  mcpServers: Record<string, MCPServerConfig>;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Progress step for tracking
 */
export interface ProgressStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'done' | 'error';
  error?: string;
}

/**
 * Platform strategy interface
 */
export interface PlatformStrategy {
  name: Platform;
  displayName: string;
  configFolder: string;
  mcpConfigPath: string;
  available: boolean;

  copyConfig(source: string, target: string, dry: boolean): Promise<void>;
  transformMCPConfig(config: MCPConfig): MCPConfig;
  validate(targetPath: string): Promise<ValidationResult>;
}

/**
 * Init command options
 */
export interface InitOptions {
  path: string;
  branch: string;
  dry: boolean;
  force: boolean;
}

/**
 * Update command options
 */
export interface UpdateOptions {
  path: string;
  branch: string;
  dry: boolean;
  backup: boolean;
}
