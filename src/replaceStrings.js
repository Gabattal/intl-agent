require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const {escapeRegExp, normalizeString} = require("./utils");

async function replaceStringsInFiles(filePath, stringToKeyMap) {
    let content = await fs.readFile(filePath, "utf8");
    let replacementsCount = 0;

    for (const [originalString, key] of Object.entries(stringToKeyMap)) {
        const normalizedString = normalizeString(originalString);
        const regex = new RegExp(`##\\s*${ escapeRegExp(normalizedString) }\\s*##`, "gi");
        const prefix = process.env.PREFIX;
        const suffix = process.env.SUFFIX;
        const newContent = content.replace(regex, `${prefix}.${ key }.${suffix}`);
        if (newContent !== content) {
            content = newContent;
            replacementsCount++;
        }
    }

    await fs.writeFile(filePath, content, "utf8");
}

module.exports = replaceStringsInFiles;