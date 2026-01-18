import { Command } from 'commander';
import { showBanner } from '../ui/banner.js';
import { intro, logError } from '../ui/prompts.js';
import { runUpdate } from '../core/config-manager.js';
import { DEFAULT_BRANCH } from '../utils/constants.js';

export const updateCommand = new Command('update')
  .description('Update existing LTVAI Kit configuration to latest version')
  .option('-p, --path <path>', 'Target directory path', process.cwd())
  .option('-b, --branch <branch>', 'Git branch to clone from', DEFAULT_BRANCH)
  .option('--dry', 'Dry run mode - show what would be done', false)
  .option('--no-backup', 'Skip creating backup before updating')
  .action(async (options) => {
    showBanner();
    intro('LTVAI Kit Update');

    try {
      await runUpdate({
        path: options.path,
        branch: options.branch,
        dry: options.dry,
        backup: options.backup !== false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logError(errorMessage);
      process.exit(1);
    }
  });
