/**
 * Repository URL for cloning (SSH)
 * Change this to your actual repository URL
 */
export const REPO_URL = "git@github.com:tohainam/ltvai-kit.git";

/**
 * Default branch to clone
 */
export const DEFAULT_BRANCH = "main";

/**
 * Temp directory prefix for cloning
 */
export const TEMP_DIR_PREFIX = "ltvai-kit-";

/**
 * Files/folders to exclude when copying
 */
export const EXCLUDE_PATTERNS = [
  "settings.local.json",
  "__pycache__",
  "*.pyc",
  ".git",
  ".DS_Store",
];

/**
 * CLI version
 */
export const VERSION = "1.0.0";

/**
 * CLI name
 */
export const CLI_NAME = "ltvai-kit-cli";
