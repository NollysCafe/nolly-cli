import updateNotifier from 'update-notifier'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { execSync } from 'child_process'

const detectPackageManager = (): string => {
	const execPath = process.env.npm_execpath || ''
	if (execPath.includes('pnpm')) return 'pnpm'
	if (execPath.includes('yarn')) return 'yarn'
	return 'npm'
}

export const checkForUpdates = async (currentVersion: string): Promise<void> => {
	try {
		const notifier = updateNotifier({ pkg: { name: 'create-nolly', version: currentVersion }, updateCheckInterval: 0 })

		if (notifier.update) {
			const { latest } = notifier.update

			// Compare versions to ensure semantic pre-release compatibility
			const isOutdated = latest !== currentVersion && !currentVersion.includes('-beta')

			if (isOutdated) {
				const packageManager = detectPackageManager()
				const updateCommand =
					packageManager === 'pnpm'
						? `pnpm add -g create-nolly`
						: packageManager === 'yarn'
							? `yarn global add create-nolly`
							: `npm install -g nolly-cli`

				const { shouldUpdate } = await inquirer.prompt([
					{
						type: 'confirm',
						name: 'shouldUpdate',
						message: `⚠️ Update available: ${chalk.bold(latest)} (current: ${chalk.dim(currentVersion)}). Do you want to update now?`,
						default: true
					}
				])

				if (shouldUpdate) {
					console.log(chalk.cyan(`🚀 Updating to version ${latest} using ${packageManager}...`))
					execSync(updateCommand, { stdio: 'inherit' })
					console.log(chalk.green(`✅ Successfully updated to version ${latest}`))
				} else {
					console.log(chalk.yellow(`⚠️ Update skipped. Please update soon to enjoy the latest features.`))
				}
			} else {
				console.log(chalk.green('✅ You already have the latest version of Create Nolly CLI'))
			}
		} else {
			console.log(chalk.green('✅ You already have the latest version of Create Nolly CLI'))
		}
	} catch (error: any) {
		console.error(chalk.red(`❌ Error checking for updates: ${error.message}`))
	}
}
