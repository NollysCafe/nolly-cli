import chalk from 'chalk'
import { readCache, writeCache } from '../utils/cache.js'

// Cache settings
const CACHE_KEY = 'templates'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

// Available templates with descriptions
const templates = [
	{ name: 'frontend', description: 'Frontend (Vite + React + TypeScript + SASS)', color: chalk.cyan, icon: '⚡' },
	{ name: 'backend', description: 'Backend (Express + TypeScript)', color: chalk.green, icon: '🚀' },
	{ name: 'fullstack', description: 'Fullstack (Frontend + Backend)', color: chalk.magenta, icon: '🌈' },
]

export const getTemplates = (): typeof templates => {
	const cachedTemplates = readCache(CACHE_KEY, CACHE_TTL)
	if (cachedTemplates) {
		return cachedTemplates
	}

	writeCache(CACHE_KEY, templates)
	return templates
}

export const handleListCommand = (): void => {
	const templates = getTemplates()

	let result = chalk.bold('\n🌟 Available Templates:\n')
	templates.forEach(template => {
		result += `${template.icon} ${template.color(template.name.padEnd(10))} - ${chalk.dim(template.description)}\n`
	})
	result += chalk.bold('\n📝 Use `create-nolly new <project-name> --type <template>` to get started!\n')

	console.log(result)
}
