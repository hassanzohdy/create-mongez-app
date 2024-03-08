import { env } from "@mongez/dotenv";
import { AppConfigurations } from "@mongez/warlock";

const appConfigurations: AppConfigurations = {
  appName: env("APP_NAME", "Warlock"),
  timezone: env("TIMEZONE", "UTC"),
  baseUrl: env("BASE_URL", "http://localhost:3000"),
  localeCode: env("LOCALE_CODE", "en"),
  localeCodes: ["en", "ar"],
};

export default appConfigurations;
