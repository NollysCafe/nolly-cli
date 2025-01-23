import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { fileURLToPath } from 'url'
import { readCache, writeCache } from '../utils/cache.js'

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CACHE_KEY = 'templates'
const validTemplates = readCache(CACHE_KEY, Infinity) as { name: string }[] || [{ name: 'frontend' }, { name: 'backend' }, { name: 'fullstack' }]

export const handleNewCommand = async (args: string[]): Promise<void> => {
	try {
		// Parse project name and template type
		const typeArgIndex = args.findIndex(arg => arg === '--type')
		let projectName = args.find(arg => arg !== '--type' && !arg.startsWith('--'))
		let templateType = typeArgIndex >= 0 ? args[typeArgIndex + 1] : null

		// Validate the provided templateType immediately
		if (templateType && !validTemplates.some(template => template.name === templateType)) {
			console.error(chalk.red(`❌ Error: Invalid template type "${templateType}".`))
			console.log(chalk.cyan(`Valid types: ${validTemplates.map(template => template.name).join(', ')}`))
			return // Prevent further execution
		}

		// Interactive prompt for project name if missing
		if (!projectName) {
			const { name } = await inquirer.prompt({
				type: 'input',
				name: 'name',
				message: 'What is your project name?',
				validate: input => input.trim() !== '' || 'Project name cannot be empty.',
			})
			projectName = name
		}

		// Interactive prompt for template type if missing
		if (!templateType) {
			const { template } = await inquirer.prompt({
				type: 'list',
				name: 'template',
				message: 'Choose a project template:',
				choices: validTemplates.map(template => ({
					name: `${template.name}`,
					value: template.name,
				}))
			})
			templateType = template
		}

		const targetDir = path.resolve(process.cwd(), projectName as string)

		// Check if the project folder already exists
		if (fs.existsSync(targetDir)) {
			console.error(chalk.red(`❌ Error: Directory "${projectName}" already exists.`))
			process.exit(1)
		}

		// Resolve template directory
		const templateDir = path.resolve(__dirname, '../../../templates', templateType as string)
		if (!fs.existsSync(templateDir)) {
			console.error(chalk.red(`❌ Error: Template "${templateType}" not found.`))
			process.exit(1)
		}

		// Create project folder and copy template files
		fs.mkdirSync(targetDir, { recursive: true })
		fs.cpSync(templateDir, targetDir, { recursive: true })

		console.log(chalk.green(`🎉 Project "${projectName}" created successfully with the "${templateType}" template!`))
		console.log(chalk.cyan(`📂 Navigate to your project folder:\n  cd ${projectName}`))
	} catch (error: any) {
		if (error.isTtyError) {
			console.error(chalk.red('❌ Error: Prompt could not be rendered in the current environment.'))
		} else if (error.name === 'ExitPromptError') {
			console.log(chalk.yellow('⚠️ Operation canceled by the user. Exiting gracefully.'))
		} else {
			console.error(chalk.red(`❌ Unexpected error: ${error.message}`))
		}
		process.exit(0) // Exit gracefully
	}
}
