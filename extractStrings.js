const fs = require("fs").promises;
const path = require("path");

async function extractStringsFromFile(filePath) {
    const content = await fs.readFile(filePath, "utf8");
    const regex = /##(.*?)##/g;
    let matches;
    const extractedStrings = [];

    while ((matches = regex.exec(content)) !== null) {
        extractedStrings.push(matches[1].trim());
    }

    return { file: filePath, strings: extractedStrings };
}

module.exports = extractStringsFromFile;