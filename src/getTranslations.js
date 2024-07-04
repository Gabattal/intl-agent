const OpenAI = require('openai');
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw new Error("OpenAI API key is not defined. Please set the OPENAI_API_KEY environment variable.");
}
const openai = new OpenAI({ apiKey });

async function getTranslationsFromChatGPT(strings, languageCodes) {
    try {
        const prompt = `
  Create a JSON response that translates the following strings into English, French, and other specified languages. The translated strings should be summarized where necessary for brevity. Assign a concise, standardized English keyword to each string as a key, ensuring that the key is identical across all languages and does not exceed 30 characters. The keys should be generic English identifiers that are not direct translations but reflect the general content of the string.

The response should be formatted as a JSON object with language codes as keys. Within each language object, create key-value pairs where the key is the English keyword and the value is the translated string. The keys must remain consistent and in English for all language translations.

Here are the strings and languages required for translation:

- Strings: ${ JSON.stringify(strings) }
- Languages: ${ JSON.stringify(languageCodes) }

For example, if a string in English is "This burger is really good", the key might be "tastyBurger", and the translations should use this key across all languages.

An expected result format is as follows:
{
  "en": { "tastyBurger": "This burger is really good", "greetingSamuel": "Hello, my name is Samuel" },
  "fr": { "tastyBurger": "Ce burger est vraiment très bon", "greetingSamuel": "Bonjour, je m'appelle Samuel" }
}

Remember, the keys such as 'tastyBurger' and 'greetingSamuel' are not translations. They are standardized identifiers that should be the same for each language. The values are the actual translations of the strings. Please follow this format for each provided string and language, maintaining the same English keys across all translations.`;

        const response = await openai.chat.completions.create({
            max_tokens: 1000,
            messages: [{ content: prompt, role: "user" }],
            model: "gpt-4-1106-preview",
            temperature: 0
        });

        return response.choices[0];
    }
    catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            console.error("Error status:", error.response.status);
            console.error("Error headers:", error.response.headers);
        }
        else if (error.request) {
            console.error("Error request:", error.request);
        }
        else {
            console.error("Error message:", error.message);
        }
        return null;
    }
}

module.exports = getTranslationsFromChatGPT;