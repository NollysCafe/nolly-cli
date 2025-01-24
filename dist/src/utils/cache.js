import fs from 'fs';
import path from 'path';
const CACHE_FILE = path.resolve(process.env.HOME || process.env.USERPROFILE || '.', '.create-nolly-cache.json');
export const readCache = (key, ttl) => {
    if (fs.existsSync(CACHE_FILE)) {
        try {
            const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
            const entry = cache[key];
            if (entry && Date.now() - entry.timestamp < ttl) {
                return entry.data;
            }
        }
        catch {
            // Ignore corrupted cache
        }
    }
    return null;
};
export const writeCache = (key, data) => {
    let cache = {};
    if (fs.existsSync(CACHE_FILE)) {
        try {
            cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
        }
        catch {
            // Ignore corrupted cache
        }
    }
    cache[key] = { timestamp: Date.now(), data };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
};
export const clearCache = () => {
    if (fs.existsSync(CACHE_FILE)) {
        fs.unlinkSync(CACHE_FILE);
    }
};
//# sourceMappingURL=cache.js.map