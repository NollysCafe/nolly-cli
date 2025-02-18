import { Client, Collection, REST, Routes } from 'discord.js'
import Command from '../@types/command.t'
import { loadFiles } from './files'
import { table } from 'table'
import path from 'path'
import config from '../../config.json'

export const commands: Collection<string, Command> = new Collection()

function loadCommand(client: Client, filePath: string): Command['data'] {
	const command: Command = require(filePath).default
	if (!command.disabled && command.data) commands.set(command.data.name, command)
	return command.data
	void client
}

export async function loadCommands(client: Client): Promise<void> {
	const commands = loadFiles(client, path.resolve(__dirname, '../commands'), loadCommand)
	const data: string[][] = []
	if (commands.length) data.push(['Command', 'Description', 'Loaded'], ...commands.map((command: any) => [command.name, command.description, '✅']))
	else data.push(['\x1b[31mNo commands found\x1b[0m'])
	const rest = new REST({ version: '10' }).setToken(config.token)
	try { commands.length && await rest.put(Routes.applicationCommands(client.application?.id as string), { body: commands }) }
	catch (error: any) { console.error('\x1b[31m[❌ Commands] %s\x1b[0m', error.message) }
	console.info(table(data))
}
