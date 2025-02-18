import { Events, ModalSubmitInteraction, Client, EmbedBuilder, Colors } from 'discord.js'
import { modals } from '../../handlers/modals'
import Event from '../../@types/event.t'

export default {
	name: Events.InteractionCreate,
	description: 'Slash command handler',
	async execute(interaction: ModalSubmitInteraction, client: Client) {
		if (!interaction.isModalSubmit()) return
		const embed = new EmbedBuilder().setTimestamp()
		const modalId = interaction.customId.split(':')[0]
		const modalArguments = interaction.customId.split(':').slice(1)
		const modal = modals.get(modalId)
		if (!modal) await interaction.reply({ embeds: [embed.setDescription('This modal does not exist.').setColor(Colors.Red)], ephemeral: true })
		else if (modal.developerOnly && interaction.user.id !== client.application?.owner?.id) await interaction.reply({ embeds: [embed.setDescription('This modal is for developers only.').setColor(Colors.Red)], ephemeral: true })
		else modal.execute(interaction, client, ...modalArguments)
	}
} as Event
