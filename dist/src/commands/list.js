import chalk from 'chalk';
import { readCache, writeCache } from '../utils/cache.js';
// Available templates with descriptions
const templates = [
    { name: 'frontend', description: 'Frontend (Vite + React + TypeScript + SASS)', color: chalk.cyan, icon: '⚡' },
    { name: 'backend', description: 'Backend (Express + TypeScript)', color: chalk.green, icon: '🚀' },
    { name: 'fullstack', description: 'Fullstack (Frontend + Backend)', color: chalk.magenta, icon: '🌈' },
];
export const handleListCommand = () => {
    const CACHE_KEY = 'template-list';
    // Check the cache for a saved result
    const cachedResult = readCache(CACHE_KEY);
    if (cachedResult) {
        console.log(cachedResult);
        return;
    }
    // Generate the result if not cached
    let result = chalk.bold('\n🌟 Available Templates:\n');
    templates.forEach(template => {
        result += `${template.icon} ${template.color(template.name.padEnd(10))} - ${chalk.dim(template.description)}\n`;
    });
    result += chalk.bold('\n📝 Use `create-nolly new <project-name> --type <template>` to get started!\n');
    // Cache the result
    writeCache(CACHE_KEY, result);
    // Display the result
    console.log(result);
};
//# sourceMappingURL=list.js.map