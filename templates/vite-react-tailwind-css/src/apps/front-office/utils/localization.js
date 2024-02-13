import { current } from "@mongez/react";
import Is from "@mongez/supportive-is";
export const LingualMode = "array";
export function getLocalizedValue(value, localeCode = current("localeCode"), localeCodeKey = "localeCode", textKey = "text") {
    var _a;
    if (!value)
        return "";
    if (value[localeCode])
        return value[localeCode];
    if (Is.array(value)) {
        return (_a = value.find(item => item[localeCodeKey] === localeCode)) === null || _a === void 0 ? void 0 : _a[textKey];
    }
    return value;
}
export const localeCodesList = {
    en: {
        direction: "ltr",
        name: "English",
    },
    ar: {
        direction: "rtl",
        name: "العربية",
    },
};
export function getLocaleCodes() {
    const localeCodes = [];
    for (const localeCode in localeCodesList) {
        localeCodes.push(Object.assign({ localeCode }, localeCodesList[localeCode]));
    }
    const currentLocaleCode = current("localeCode");
    // order locale codes by current locale code
    localeCodes.sort((a, b) => {
        if (a.localeCode === currentLocaleCode)
            return -1;
        if (b.localeCode === currentLocaleCode)
            return 1;
        return 0;
    });
    return localeCodes;
}
