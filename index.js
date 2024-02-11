const extractStringsFromFile = require('./extractStrings');
const processFilesRecursively = require('./processFiles');
const getLanguageCodesFromDirectory = require('./getLanguageCodes');
const getTranslationsFromChatGPT = require('./getTranslations');
const saveTranslationsToFiles = require('./saveTranslations');
const replaceStringsInFiles = require('./replaceStrings');

module.exports = {
    extractStringsFromFile,
    processFilesRecursively,
    getLanguageCodesFromDirectory,
    getTranslationsFromChatGPT,
    saveTranslationsToFiles,
    replaceStringsInFiles
};
