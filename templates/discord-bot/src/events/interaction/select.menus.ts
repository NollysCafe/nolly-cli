import { Events, AnySelectMenuInteraction, Client, EmbedBuilder, Colors } from 'discord.js'
import { selectMenus } from '../../handlers/selectMenus'
import Event from '../../@types/event.t'

export default {
	name: Events.InteractionCreate,
	description: 'Select menu handler',
	async execute(interaction: AnySelectMenuInteraction, client: Client) {
		if (!interaction.isAnySelectMenu()) return
		const embed = new EmbedBuilder().setTimestamp()
		const selectMenuId = interaction.customId.split(':')[0]
		const selectMenuArguments = interaction.customId.split(':').slice(1)
		const selectMenu = selectMenus.get(selectMenuId)
		if (!selectMenu)
			await interaction.reply({ embeds: [embed.setDescription('This select menu does not exist.').setColor(Colors.Red)], ephemeral: true })
		else if (selectMenu.developerOnly && interaction.user.id !== client.application?.owner?.id)
			await interaction.reply({ embeds: [embed.setDescription('This select menu is for developers only.').setColor(Colors.Red)], ephemeral: true })
		else
			selectMenu.execute(interaction, client, ...selectMenuArguments)
	}
} as Event
