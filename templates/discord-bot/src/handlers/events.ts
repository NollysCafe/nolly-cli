import { Client, Collection } from 'discord.js'
import Event from '../@types/event.t'
import { loadFiles } from './files'
import { table } from 'table'
import path from 'path'

export const events: Collection<string, Event> = new Collection()

function loadEvent(client: Client, filePath: string): string[] {
	const event: Event = require(filePath).default
	if (!event.disabled) {
		if (event.once) client.once(event.name, (...args: any[]) => event.execute(...args, client))
		else client.on(event.name, (...args: any[]) => event.execute(...args, client))
		events.set(event.name, event)
	}
	return [event.name, event.description || 'No description provided', event.once ? '✅' : '❌', event.disabled ? '❌' : '✅']
}

export function loadEvents(client: Client): void {
	const events = loadFiles(client, path.resolve(__dirname, '../events'), loadEvent)
	const data: string[][] = []
	if (events.length) data.push(['Event', 'Description', 'Once', 'Loaded'], ...events)
	else data.push(['\x1b[31mNo events found\x1b[0m'])
	console.info(table(data))
}
