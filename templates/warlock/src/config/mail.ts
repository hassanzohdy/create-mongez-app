import { env } from "@mongez/dotenv";
import { MailConfigurations } from "@mongez/warlock";

const mailConfigurations: MailConfigurations = {
  host: env("MAIL_HOST"),
  username: env("MAIL_USERNAME"),
  password: env("MAIL_PASSWORD"),
  port: env("MAIL_PORT"),
  secure: env("MAIL_SECURE"),
  from: {
    name: env("MAIL_FROM_NAME"),
    address: env("MAIL_FROM_ADDRESS"),
  },
};

export default mailConfigurations;
