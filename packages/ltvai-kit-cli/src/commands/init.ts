import { Command } from 'commander';
import { showBanner } from '../ui/banner.js';
import { intro, logError } from '../ui/prompts.js';
import { runInit } from '../core/config-manager.js';
import { DEFAULT_BRANCH } from '../utils/constants.js';

export const initCommand = new Command('init')
  .description('Initialize LTVAI Kit configuration in target directory')
  .option('-p, --path <path>', 'Target directory path', process.cwd())
  .option('-b, --branch <branch>', 'Git branch to clone from', DEFAULT_BRANCH)
  .option('--dry', 'Dry run mode - show what would be done', false)
  .option('-f, --force', 'Force overwrite existing configuration', false)
  .action(async (options) => {
    showBanner();
    intro('LTVAI Kit Setup');

    try {
      await runInit({
        path: options.path,
        branch: options.branch,
        dry: options.dry,
        force: options.force,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logError(errorMessage);
      process.exit(1);
    }
  });
