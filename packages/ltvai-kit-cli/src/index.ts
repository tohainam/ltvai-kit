import { Command } from 'commander';
import { VERSION, CLI_NAME } from './utils/constants.js';
import { initCommand } from './commands/init.js';
import { updateCommand } from './commands/update.js';

const program = new Command();

program
  .name(CLI_NAME)
  .description('CLI tool to setup LTVAI Kit configuration for Claude Code and Antigravity')
  .version(VERSION);

program.addCommand(initCommand);
program.addCommand(updateCommand);

program.parse();
