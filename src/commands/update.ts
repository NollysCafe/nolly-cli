import chalk from 'chalk'
import { checkForUpdates } from '../utils/update-checker.js'

export const handleUpdateCommand = async (currentVersion: string): Promise<void> => {
	try {
		// Use the existing utility to check for updates
		await checkForUpdates(currentVersion)

		// If no update was available, notify the user
		console.log(chalk.green('✅ You already have the latest version of Create Nolly CLI'))
	} catch (error: any) {
		console.error(chalk.red(`❌ Error checking for updates: ${error.message}`))
	}
}
