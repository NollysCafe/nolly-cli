import { Client, Collection } from 'discord.js'
import Button from '../@types/button.t'
import { loadFiles } from './files'
import { table } from 'table'
import path from 'path'

export const buttons: Collection<string, Button> = new Collection()

function loadButton(_: Client, filePath: string): string[] {
	const button: Button = require(filePath).default
	if (!button.disabled) buttons.set(button.customId, button)
	return [button.customId, button.description || 'No description provided', button.disabled ? '❌' : '✅']
}

export function loadButtons(client: Client): void {
	const buttons = loadFiles(client, path.resolve(__dirname, '../buttons'), loadButton)
	const data: string[][] = []
	if (buttons.length) data.push(['Button', 'Description', 'Loaded'], ...buttons)
	else data.push(['\x1b[31mNo button found\x1b[0m'])
	console.info(table(data))
}
