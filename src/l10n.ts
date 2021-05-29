import { l10nStrings } from "./l10n/"

interface Strings {
    [key: string]: {
        [key: string]: string
    }
}

const l10n = {
    availableLanguages: [
        "en",
        "es"
    ],

    get currentLanguage(): string {
        if(typeof(window) === "undefined") return "";

        return window.document.documentElement.lang || "";
    },

    hydrate: (l10nString: string, attributes?: any): string => {
        const strings: Strings = l10nStrings;
        const lang: string = l10n.currentLanguage.toString();

        const langStrings = strings[attributes.lang ? attributes.lang : lang];

        if(langStrings && langStrings[l10nString]) return langStrings[l10nString];
        // Fallback to English translation if we can.
        if(!langStrings && strings.en && strings.en[l10nString]) return strings.en[l10nString];

        // If that isn't available in English, we just return the l10n id.
        return l10nString;
    }
}

export default l10n;