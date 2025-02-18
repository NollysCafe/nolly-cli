import { Events, ChatInputCommandInteraction, Client, EmbedBuilder, Colors } from 'discord.js'
import { commands } from '../../handlers/commands'
import config from '../../../config.json'
import Event from '../../@types/event.t'

export default {
	name: Events.InteractionCreate,
	description: 'Slash command handler',
	async execute(interaction: ChatInputCommandInteraction, client: Client) {
		if (!interaction.isChatInputCommand()) return
		const embed = new EmbedBuilder().setTimestamp()
		const command = commands.get(interaction.commandName)
		if (!command)
			await interaction.reply({ embeds: [embed.setDescription('This command does not exist.').setColor(Colors.Red)], ephemeral: true })
		else if (command.developerOnly && interaction.user.id !== config.owner)
			await interaction.reply({ embeds: [embed.setDescription('This command is for developers only.').setColor(Colors.Red)], ephemeral: true })
		else
			command.execute && command.execute(interaction, client)
	}
} as Event
