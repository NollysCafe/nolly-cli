import { SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export default interface Command {
	disabled?: boolean
	developerOnly?: boolean
	adminOnly?: boolean
	data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder
	execute?: (...args: any[]) => void
}
