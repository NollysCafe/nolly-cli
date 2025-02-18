import { checkForUpdates } from './utils/update-checker.js'
import { handleHelpCommand } from './commands/help.js'
import { branding } from './utils/branding.js'
import { handleNewCommand } from './commands/new.js'
import { handleListCommand } from './commands/list.js'
import { handleUpdateCommand } from './commands/update.js'

import chalk from 'chalk'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'


// Dynamically load package.json
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf-8'))

export const runCLI = async (args: string[]): Promise<void> => {
	const { version } = packageJson
	process.env.VERSION = version

	// Check for updates
	await checkForUpdates(version)

	// Check if no arguments were provided
	if (args.length === 0) {
		console.error(chalk.red('❌ Error: No arguments provided. Use --help to see available options.'))
		process.exit(1)
	}

	// Get the command and arguments
	const [command, ...restArgs] = args

	// Handle the command
	switch (command) {
		case '--help':
		case '-h':
			console.log(branding())
			handleHelpCommand()
			break

		case '--version':
		case '-v':
			console.log(chalk.bold(`🌟 Nolly CLI`))
			console.log(chalk.green(`Version: ${version}`))
			break

		case 'new':
			await handleNewCommand(restArgs)
			break

		case 'list':
			handleListCommand()
			break

		case 'update':
			await handleUpdateCommand(version)
			break

		default:
			console.error(chalk.red(`❌ Error: Invalid command "${command}".`))
			console.log(chalk.cyan('Use --help to see available options.'))
			process.exit(1)
	}
}
