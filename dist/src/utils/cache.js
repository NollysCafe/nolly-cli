import fs from 'fs';
import path from 'path';
const CACHE_FILE = path.resolve(process.env.HOME || process.env.USERPROFILE || '.', '.create-nolly-cache.json');
const CACHE_TTL_MS = 60 * 60 * 1000;
export const readCache = (key) => {
    if (fs.existsSync(CACHE_FILE)) {
        try {
            const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
            const entry = cache[key];
            if (entry && Date.now() - entry.timestamp < CACHE_TTL_MS) {
                return entry.data;
            }
        }
        catch {
            // Ignore corrupted cache files
        }
    }
    return null;
};
export const writeCache = (key, data) => {
    let cache = {};
    // Read the existing cache if it exists
    if (fs.existsSync(CACHE_FILE)) {
        try {
            cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
        }
        catch {
            // Ignore corrupted cache files
        }
    }
    // Write the new cache entry
    cache[key] = { timestamp: Date.now(), data };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
};
export const clearCache = () => {
    if (fs.existsSync(CACHE_FILE)) {
        fs.unlinkSync(CACHE_FILE);
    }
};
//# sourceMappingURL=cache.js.map