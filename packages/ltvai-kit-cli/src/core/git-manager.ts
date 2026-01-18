import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { REPO_URL, DEFAULT_BRANCH, TEMP_DIR_PREFIX } from '../utils/constants.js';
import { removeDir, pathExists } from '../utils/fs-utils.js';
import { logInfo } from '../ui/prompts.js';

/**
 * Clone repository to a temporary directory
 */
export async function cloneRepo(
  branch: string = DEFAULT_BRANCH,
  dry: boolean = false
): Promise<string> {
  const tempDir = join(tmpdir(), `${TEMP_DIR_PREFIX}${randomUUID().slice(0, 8)}`);

  if (dry) {
    logInfo(`[DRY RUN] Would clone ${REPO_URL} (branch: ${branch}) to ${tempDir}`);
    return tempDir;
  }

  try {
    // Clone with specific branch, shallow clone for speed
    const command = `git clone --depth 1 --branch ${branch} ${REPO_URL} "${tempDir}"`;
    execSync(command, { stdio: 'pipe' });

    return tempDir;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to clone repository: ${errorMessage}`);
  }
}

/**
 * Cleanup temporary directory
 */
export function cleanupTempDir(tempDir: string, dry: boolean = false): void {
  if (dry) {
    logInfo(`[DRY RUN] Would cleanup temp directory: ${tempDir}`);
    return;
  }

  if (pathExists(tempDir)) {
    removeDir(tempDir);
  }
}

/**
 * Check if git is available
 */
export function isGitAvailable(): boolean {
  try {
    execSync('git --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if SSH key is configured for GitHub
 */
export function isSSHConfigured(): boolean {
  try {
    execSync('ssh -T git@github.com 2>&1 || true', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}
