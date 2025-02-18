import { Client, Collection } from 'discord.js'
import Modal from '../@types/modal.t'
import { loadFiles } from './files'
import { table } from 'table'
import path from 'path'

export const modals: Collection<string, Modal> = new Collection()

function loadModal(_: Client, filePath: string): string[] {
	const modal: Modal = require(filePath).default
	if (!modal.disabled) modals.set(modal.customId, modal)
	return [modal.customId, modal.description || 'No description provided', modal.disabled ? '❌' : '✅']
}

export function loadModals(client: Client): void {
	const modals = loadFiles(client, path.resolve(__dirname, '../modals'), loadModal)
	const data: string[][] = []
	if (modals.length) data.push(['Modal', 'Description', 'Loaded'], ...modals)
	else data.push(['\x1b[31mNo modals found\x1b[0m'])
	console.info(table(data))
}
