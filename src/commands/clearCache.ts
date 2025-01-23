import { clearCache } from '../utils/cache.js'
import chalk from 'chalk'

export const handleClearCacheCommand = (): void => {
	clearCache()
	console.log(chalk.green('✅ Cache cleared successfully.'))
}
