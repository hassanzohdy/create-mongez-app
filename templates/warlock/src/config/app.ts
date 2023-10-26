import { env } from "@mongez/dotenv";

export const appConfigurations = {
  debug: env("DEBUG", false),
  timezone: env("TIMEZONE", "UTC"),
  baseUrl: env("BASE_URL", "http://localhost:3000"),
};
