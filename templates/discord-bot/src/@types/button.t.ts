export default interface Button {
	disabled?: boolean
	developerOnly?: boolean
	adminOnly?: boolean
	customId: string
	description?: string
	execute: (...args: any[]) => void
}
