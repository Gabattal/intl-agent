# Intl-agent

intl-agent is an automation tool designed to streamline the localization process of applications by automatically translating strings enclosed within double hashes (`##string##`) in all files within your `src` directory. These strings are translated and saved into an `intl` directory, and the generated keys replace the original strings in the source files.

## Features

- **Automatic String Detection**: Scans the `src` directory for strings marked for translation.
- **Unique Key Generation**: Creates unique English identifiers for each detected string.
- **Translation via OpenAI**: Utilizes the OpenAI API to translate strings into the specified languages.
- **Multilanguage Support**: Translates strings into multiple languages and stores them in the `intl` directory.

## Prerequisites

To use intl-agent, ensure that you have:

- Node.js installed on your system.
- An OpenAI account with API access.

## Installation

Install intl-agent using npm:

```sh
npm install intl-agent
```

Alternatively, to install it globally and use it across multiple projects:

```sh
npm install -g intl-agent
```

## Configuration

Set up the following environment variables in your project:

- `OPENAI_API_KEY`: Your OpenAI API key.
- `DEFAULT_LANGUAGE`: The default language code for the translations (e.g., 'en' for English, 'fr' for French).
- `PREFIX`: An optional default prefix to prepend to your translation keys.

Create a `.env` file in the root of your project with the following content:

```plaintext
OPENAI_API_KEY=your_openai_api_key_here
DEFAULT_LANGUAGE=fr
PREFIX=your_default_prefix_here
```

## Usage

After installation and configuration, run intl-agent from a directory which contain a src folder of your project with the following command:

``` sh
intl-agent
```



Intl-agent will process all the strings within the `src` directory, translate them using OpenAI, and save the translations in the `intl` directory. It will then replace the strings in the source files with the generated keys.

## Contributing

If you'd like to contribute to the development of intl-agent, please follow the standard fork and pull request workflow.

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or require assistance, please file an issue on the project's GitHub issue tracker.
