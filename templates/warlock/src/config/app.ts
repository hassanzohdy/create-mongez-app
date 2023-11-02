import { env } from "@mongez/dotenv";

export const appConfigurations = {
  baseUrl: env("BASE_URL", "http://localhost:" + env("PORT")),
  debug: env("DEBUG", false),
  timezone: env("TIMEZONE", "UTC"),
  localeCode: env("LOCALE_CODE", "en"),
};
