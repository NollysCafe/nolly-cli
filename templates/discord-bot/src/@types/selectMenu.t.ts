export default interface SelectMenu {
	disabled?: boolean
	developerOnly?: boolean
	adminOnly?: boolean
	customId: string
	description?: string
	execute: (...args: any[]) => void
}