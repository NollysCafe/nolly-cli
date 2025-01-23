import updateNotifier from 'update-notifier'
import chalk from 'chalk'
import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const UPDATE_CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000 // 24 hours
const UPDATE_TRACK_FILE = path.resolve(process.env.HOME || process.env.USERPROFILE || '.', '.create-nolly-update.json')

const detectPackageManager = (): string => {
	const execPath = process.env.npm_execpath || ''
	if (execPath.includes('pnpm')) return 'pnpm'
	if (execPath.includes('yarn')) return 'yarn'
	return 'npm' // Default to npm if no match
}

const readLastUpdateCheck = (): number | null => {
	if (fs.existsSync(UPDATE_TRACK_FILE)) {
		try {
			const data = JSON.parse(fs.readFileSync(UPDATE_TRACK_FILE, 'utf-8'))
			return data.lastChecked || null
		} catch {
			return null
		}
	}
	return null
}

const writeLastUpdateCheck = () => {
	const now = Date.now()
	fs.writeFileSync(UPDATE_TRACK_FILE, JSON.stringify({ lastChecked: now }), 'utf-8')
}

export const checkForUpdates = async (currentVersion: string): Promise<void> => {
	try {
		// Skip the update prompt if the last check was within the interval
		const lastChecked = readLastUpdateCheck()
		if (lastChecked && Date.now() - lastChecked < UPDATE_CHECK_INTERVAL_MS) {
			return
		}

		// Notify if an update is available
		const notifier = updateNotifier({ pkg: { name: 'create-nolly', version: currentVersion }, updateCheckInterval: 0 })

		if (notifier.update) {
			const { latest } = notifier.update

			// Detect the package manager
			const packageManager = detectPackageManager()
			const updateCommand = packageManager === 'pnpm' ? `pnpm add -g create-nolly` : packageManager === 'yarn' ? `yarn global add create-nolly` : `npm install -g create-nolly`

			// Prompt the user for action
			const { shouldUpdate } = await inquirer.prompt([
				{
					type: 'confirm',
					name: 'shouldUpdate',
					message: `⚠️ Update available: ${chalk.bold(latest)} (current: ${chalk.dim(currentVersion)}). Do you want to update now?`,
					default: true,
				},
			])

			if (shouldUpdate) {
				// Run the global update command
				console.log(chalk.cyan(`🚀 Updating to version ${latest} using ${packageManager}...`))
				execSync(updateCommand, { stdio: 'inherit' })
				console.log(chalk.green(`✅ Successfully updated to version ${latest}.`))
			} else {
				// Write the last checked timestamp to suppress prompts for 24 hours
				writeLastUpdateCheck()
				console.log(chalk.yellow(`⚠️ Update skipped. You won't be asked again for 24 hours.`))
			}
		}
	} catch (error: any) {
		console.error(chalk.red('❌ Error checking or performing updates.'), error.message)
	}
}
