import { clearCache } from '../utils/cache.js';
import chalk from 'chalk';
export const handleClearCacheCommand = () => {
    clearCache();
    console.log(chalk.green('✅ Cache cleared successfully.'));
};
//# sourceMappingURL=clearCache.js.map