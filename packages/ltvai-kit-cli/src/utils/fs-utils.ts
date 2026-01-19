import { existsSync, mkdirSync, cpSync, rmSync, readdirSync, statSync, chmodSync, copyFileSync as fsCopyFileSync } from 'node:fs';
import { join } from 'node:path';
import { EXCLUDE_PATTERNS } from './constants.js';

/**
 * Check if a path exists
 */
export function pathExists(path: string): boolean {
  return existsSync(path);
}

/**
 * Create directory recursively
 */
export function ensureDir(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

/**
 * Remove directory recursively
 */
export function removeDir(path: string): void {
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
  }
}

/**
 * Check if a name matches any exclude pattern
 */
function shouldExclude(name: string): boolean {
  return EXCLUDE_PATTERNS.some((pattern) => {
    if (pattern.includes('*')) {
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
      return regex.test(name);
    }
    return name === pattern;
  });
}

/**
 * Copy directory recursively with exclusions
 */
export function copyDirWithExclusions(
  source: string,
  target: string,
  dry: boolean = false
): { copied: string[]; skipped: string[] } {
  const copied: string[] = [];
  const skipped: string[] = [];

  function copyRecursive(src: string, dest: string, relativePath: string = ''): void {
    const entries = readdirSync(src);

    for (const entry of entries) {
      const srcPath = join(src, entry);
      const destPath = join(dest, entry);
      const relPath = relativePath ? `${relativePath}/${entry}` : entry;

      if (shouldExclude(entry)) {
        skipped.push(relPath);
        continue;
      }

      const stat = statSync(srcPath);

      if (stat.isDirectory()) {
        if (!dry) {
          ensureDir(destPath);
        }
        copyRecursive(srcPath, destPath, relPath);
      } else {
        if (!dry) {
          cpSync(srcPath, destPath);
          // Make shell scripts executable
          if (entry.endsWith('.sh')) {
            chmodSync(destPath, 0o755);
          }
        }
        copied.push(relPath);
      }
    }
  }

  if (!dry) {
    ensureDir(target);
  }
  copyRecursive(source, target);

  return { copied, skipped };
}

/**
 * Create backup of a directory
 */
export function createBackup(path: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `${path}.backup-${timestamp}`;

  if (existsSync(path)) {
    cpSync(path, backupPath, { recursive: true });
  }

  return backupPath;
}

/**
 * Get list of files in a directory
 */
export function listFiles(dir: string): string[] {
  if (!existsSync(dir)) {
    return [];
  }

  const files: string[] = [];

  function walk(currentDir: string, relativePath: string = ''): void {
    const entries = readdirSync(currentDir);

    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const relPath = relativePath ? `${relativePath}/${entry}` : entry;
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath, relPath);
      } else {
        files.push(relPath);
      }
    }
  }

  walk(dir);
  return files;
}

/**
 * Copy a single file
 */
export function copyFileSync(source: string, target: string): void {
  const { dirname } = require('node:path');
  const dir = dirname(target);
  ensureDir(dir);
  fsCopyFileSync(source, target);
}
