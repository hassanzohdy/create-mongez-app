import { env } from "@mongez/dotenv";
const appConfigurations = {
    timezone: env("TIMEZONE", "UTC"),
    baseUrl: env("BASE_URL", "http://localhost:3000"),
    localeCode: env("LOCALE_CODE", "en"),
    localeCodes: ["en", "ar"],
};
export default appConfigurations;
