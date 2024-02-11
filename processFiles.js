const fs = require("fs").promises;
const path = require("path");
const extractStringsFromFile = require('./extractStrings');

async function processFilesRecursively(directory) {
    let results = [];
    const entries = await fs.readdir(directory, { withFileTypes: true });

    const entryPromises = entries.map(async (entry) => {
        const resPath = path.resolve(directory, entry.name);

        if (entry.isDirectory()) {
            const subdirectoryResults = await processFilesRecursively(resPath);
            results = results.concat(subdirectoryResults);
        }
        else if (entry.isFile()) {
            const fileResults = await extractStringsFromFile(resPath);
            if (fileResults.strings.length) {
                results.push(fileResults);
            }
        }
    });

    await Promise.all(entryPromises);
    return results;
}

module.exports = processFilesRecursively;