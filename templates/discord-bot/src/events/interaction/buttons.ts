import { Events, ButtonInteraction, Client, EmbedBuilder, Colors } from 'discord.js'
import { buttons } from '../../handlers/buttons'
import Event from '../../@types/event.t'

export default {
	name: Events.InteractionCreate,
	description: 'Button handler',
	async execute(interaction: ButtonInteraction, client: Client) {
		if (!interaction.isButton()) return
		const embed = new EmbedBuilder().setTimestamp()
		const buttonId = interaction.customId.split(':')[0]
		const buttonArguments = interaction.customId.split(':').slice(1)
		const button = buttons.get(buttonId)
		if (!button)
			await interaction.reply({ embeds: [embed.setDescription('This button does not exist.').setColor(Colors.Red)], ephemeral: true })
		else if (button.developerOnly && interaction.user.id !== client.application?.owner?.id)
			await interaction.reply({ embeds: [embed.setDescription('This button is for developers only.').setColor(Colors.Red)], ephemeral: true })
		else
			button.execute(interaction, client, ...buttonArguments)
	}
} as Event
