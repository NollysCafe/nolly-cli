import { Client, Collection } from 'discord.js'
import SelectMenu from '../@types/selectMenu.t'
import { loadFiles } from './files'
import { table } from 'table'
import path from 'path'

export const selectMenus: Collection<string, SelectMenu> = new Collection()

function loadSelectMenu(_: Client, filePath: string): string[] {
	const selectMenu: SelectMenu = require(filePath).default
	if (!selectMenu.disabled) selectMenus.set(selectMenu.customId, selectMenu)
	return [selectMenu.customId, selectMenu.description || 'No description provided', selectMenu.disabled ? '❌' : '✅']
}

export function loadSelectMenus(client: Client): void {
	const selectMenus = loadFiles(client, path.resolve(__dirname, '../select menus'), loadSelectMenu)
	const data: string[][] = []
	if (selectMenus.length) data.push(['Modal', 'Description', 'Loaded'], ...selectMenus)
	else data.push(['\x1b[31mNo select menu found\x1b[0m'])
	console.info(table(data))
}
