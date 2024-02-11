#!/usr/bin/env node
const path = require("path");
require('dotenv').config();
const processFilesRecursively = require("./processFiles");
const getLanguageCodesFromDirectory = require("./getLanguageCodes");
const getTranslationsFromChatGPT = require("./getTranslations");
const saveTranslationsToFiles = require("./saveTranslations");
const replaceStringsInFiles = require("./replaceStrings");

const directoryPath = path.join(process.cwd(), "src");
const intlDirectoryPath = path.join(process.cwd(), "src/intl");


async function main() {
    try {
        const results = await processFilesRecursively(directoryPath);
        const languageCodes = await getLanguageCodesFromDirectory(intlDirectoryPath);
        const allStrings = results.flatMap(result => result.strings);

        if (allStrings.length === 0) {
            return;
        }

        const translations = await getTranslationsFromChatGPT(allStrings, languageCodes);
        const parsedTranslations = JSON.parse(translations.message.content);

        const stringToKeyMap = {};
        const specificLanguage = process.env.DEFAULT_LANGUAGE;
        if (parsedTranslations[specificLanguage]) {
            for (const key in parsedTranslations[specificLanguage]) {
                stringToKeyMap[parsedTranslations[specificLanguage][key]] = key;
            }
        }

        for (const language in parsedTranslations) {
            await saveTranslationsToFiles(intlDirectoryPath,language, parsedTranslations[language]);
        }
        for (const result of results) {
            await replaceStringsInFiles(result.file, stringToKeyMap);
        }
    } catch (error) {
        console.error("An error has occurred:", error);
    }
}

main();
