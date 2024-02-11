const fs = require("fs").promises;

async function getLanguageCodesFromDirectory(directory) {
    const files = await fs.readdir(directory);
    return files
        .map(file => {
            const match = file.match(/(..)\.json$/);
            return match ? match[1] : null;
        })
        .filter(Boolean);
}

module.exports = getLanguageCodesFromDirectory;