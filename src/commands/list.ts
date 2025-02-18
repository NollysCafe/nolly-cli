import chalk from 'chalk'

// Available templates with descriptions
const templates = [
	{ name: 'frontend', description: 'Frontend (Vite + React + TypeScript + SASS)', color: chalk.cyan, icon: '⚡' },
	{ name: 'backend', description: 'Backend (Express + TypeScript)', color: chalk.green, icon: '🚀' },
	{ name: 'fullstack', description: 'Fullstack (Frontend + Backend)', color: chalk.magenta, icon: '🌈' },
	{ name: 'discord-bot', description: 'Discord Bot (Discord.js + TypeScript)', color: chalk.blue, icon: '🤖' },
]

export const getTemplates = (): typeof templates => {
	return templates
}

export const handleListCommand = (): void => {
	const availableTemplates = getTemplates()

	let result = chalk.bold('\n🌟 Available Templates:\n')
	availableTemplates.forEach(template => {
		result += `${template.icon} ${template.color(template.name.padEnd(10))} - ${chalk.dim(template.description)}\n`
	})
	result += chalk.bold('\n📝 Use `create-nolly new <project-name> --type <template>` to get started!\n')

	console.log(result)
}
