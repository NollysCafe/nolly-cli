import fs from 'fs'
import path from 'path'

const CACHE_FILE = path.resolve(process.env.HOME || process.env.USERPROFILE || '.', '.create-nolly-cache.json')

const CACHE_TTL = {
	templates: 60 * 60 * 1000, // 1 hour
	metadata: 24 * 60 * 60 * 1000, // 24 hours
}

interface CacheData {
	[key: string]: {
		timestamp: number
		data: any
	}
}

export const readCache = (key: string, ttl: number): any | null => {
	if (fs.existsSync(CACHE_FILE)) {
		try {
			const cache: CacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'))
			const entry = cache[key]
			if (entry && Date.now() - entry.timestamp < ttl) {
				return entry.data
			}
		} catch {
			// Ignore corrupted cache
		}
	}
	return null
}

export const writeCache = (key: string, data: any): void => {
	let cache: CacheData = {}

	if (fs.existsSync(CACHE_FILE)) {
		try {
			cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'))
		} catch {
			// Ignore corrupted cache
		}
	}

	cache[key] = { timestamp: Date.now(), data }
	fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8')
}

export const clearCache = (): void => {
	if (fs.existsSync(CACHE_FILE)) {
		fs.unlinkSync(CACHE_FILE)
	}
}
