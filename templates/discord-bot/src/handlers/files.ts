import { Client } from 'discord.js'
import fs from 'fs-extra'
import path from 'path'

export function loadFiles(client: Client, directory: string, callback: (...args: any[]) => any): string[][] {
	const data: string[][] = []
	if (!fs.existsSync(directory)) return data
	const files = fs.readdirSync(directory)
	for (const file in files) {
		const filePath = path.resolve(directory, files[file])
		if (fs.statSync(filePath).isDirectory())
			data.push(...loadFiles(client, filePath, callback))
		else if (filePath.endsWith('.ts') || filePath.endsWith('.js'))
			data.push(callback(client, filePath))
	}
	return data
}

