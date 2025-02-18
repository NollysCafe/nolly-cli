import { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder, Colors } from 'discord.js'
import Command from '../@types/command.t'

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the bot\'s ping and latency.'),
	async execute(interaction: ChatInputCommandInteraction, client: Client): Promise<any> {
		const ping = Math.round(Date.now() - interaction.createdTimestamp)
		const latency = Math.round(client.ws.ping)
		const averageLatency = Math.round((client.ws.ping + ping) / 2)
		const color = averageLatency < 150 ? Colors.Green : averageLatency < 200 ? Colors.Yellow : averageLatency < 250 ? Colors.Orange : Colors.Red
		const embed = new EmbedBuilder().setColor(color).setTitle('🏓 Pong!')
			.setDescription(`
				**Ping:** ${ping}ms
				**Latency:** ${latency}ms
				**Average Latency:** ${averageLatency}ms
			`)
			.setTimestamp()
		await interaction.reply({ embeds: [embed], ephemeral: true })
	}
} as Command
