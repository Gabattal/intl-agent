const fs = require('fs').promises;
const path = require('path');

async function saveTranslationsToFiles(intlDirectoryPath,language, translations) {
    const filePath = path.join(intlDirectoryPath, `${ language }.json`);
    let existingTranslations = {};

    try {
        const fileContent = await fs.readFile(filePath, "utf8");
        existingTranslations = JSON.parse(fileContent);
    }
    catch (error) {
        console.log(`Creating new file for ${ language }`);
    }

    const updatedTranslations = { ...existingTranslations, ...translations };

    await fs.writeFile(filePath, JSON.stringify(updatedTranslations, null, 2), "utf8");
}

module.exports = saveTranslationsToFiles;