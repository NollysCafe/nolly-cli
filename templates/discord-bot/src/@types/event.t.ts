export default interface Event {
	disabled?: boolean
	name: string
	description?: string
	once?: boolean
	execute: (...args: any[]) => void
}