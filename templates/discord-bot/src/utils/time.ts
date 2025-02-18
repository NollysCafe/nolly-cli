export const yearToMs = (years: number): number => years * 31536000000
export const monthToMs = (months: number): number => months * 2592000000
export const weekToMs = (weeks: number): number => weeks * 604800000
export const dayToMs = (days: number): number => days * 86400000
export const hourToMs = (hours: number): number => hours * 3600000
export const minuteToMs = (minutes: number): number => minutes * 60000
export const secondToMs = (seconds: number): number => seconds * 1000

export const msToYear = (ms: number): number => ms / 31536000000
export const msToMonth = (ms: number): number => ms / 2592000000
export const msToWeek = (ms: number): number => ms / 604800000
export const msToDay = (ms: number): number => ms / 86400000
export const msToHour = (ms: number): number => ms / 3600000
export const msToMinute = (ms: number): number => ms / 60000
export const msToSecond = (ms: number): number => ms / 1000

export const dateToMS = (date: string): number => {
	const regex = /(\d+)(y|M|w|d|h|m|s|ms)/
	const match = date.match(regex)
	if (!match) return 0
	const value = parseInt(match[1])
	const unit = match[2]
	switch (unit) {
		case 'y':
			return yearToMs(value)
		case 'M':
			return monthToMs(value)
		case 'w':
			return weekToMs(value)
		case 'd':
			return dayToMs(value)
		case 'h':
			return hourToMs(value)
		case 'm':
			return minuteToMs(value)
		case 's':
			return secondToMs(value)
		case 'ms':
			return value
	}
	return 0
}
export const msToDate = (ms: number): string => {
	const years = Math.floor(msToYear(ms))
	ms -= yearToMs(years)
	const months = Math.floor(msToMonth(ms))
	ms -= monthToMs(months)
	const weeks = Math.floor(msToWeek(ms))
	ms -= weekToMs(weeks)
	const days = Math.floor(msToDay(ms))
	ms -= dayToMs(days)
	const hours = Math.floor(msToHour(ms))
	ms -= hourToMs(hours)
	const minutes = Math.floor(msToMinute(ms))
	ms -= minuteToMs(minutes)
	const seconds = Math.floor(msToSecond(ms))
	ms -= secondToMs(seconds)
	const milliseconds = ms
	return `${years}y ${months}M ${weeks}w ${days}d ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`
}