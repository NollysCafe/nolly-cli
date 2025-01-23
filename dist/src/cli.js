import { checkForUpdates } from './utils/update-checker.js';
import { displayHelp } from './utils/help.js';
import { branding } from './utils/branding.js';
import { handleNewCommand } from './commands/new.js';
import { handleListCommand } from './commands/list.js';
import { handleClearCacheCommand } from './commands/clearCache.js';
import chalk from 'chalk';
const version = '0.1.0';
export const runCLI = async (args) => {
    // Check for updates
    await checkForUpdates(version);
    // Check if no arguments were provided
    if (args.length === 0) {
        console.error(chalk.red('❌ Error: No arguments provided. Use --help to see available options.'));
        process.exit(1);
    }
    // Get the command and arguments
    const [command, ...restArgs] = args;
    // Handle the command
    switch (command) {
        case '--help':
        case '-h':
            console.log(branding());
            displayHelp();
            break;
        case '--version':
        case '-v':
            console.log(chalk.bold(`🌟 Create Nolly CLI`));
            console.log(chalk.green(`Version: ${version}`));
            break;
        case 'new':
            await handleNewCommand(restArgs);
            break;
        case 'list':
            handleListCommand();
            break;
        case 'clear-cache':
            handleClearCacheCommand();
            break;
        default:
            console.error(chalk.red(`❌ Error: Invalid command "${command}".`));
            console.log(chalk.cyan('Use --help to see available options.'));
            process.exit(1);
    }
};
//# sourceMappingURL=cli.js.map