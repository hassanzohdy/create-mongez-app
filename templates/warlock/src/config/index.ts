import config from "@mongez/config";
import logger, { ConsoleLog } from "@mongez/logger";
import { setDatabaseConfigurations } from "@mongez/monpulse";
import { setMailConfigurations } from "@mongez/warlock";
import { appConfigurations } from "./app";
import authConfigurations from "./auth";
import { databaseConfigurations } from "./database";
import { httpConfigurations } from "./http";
import { mailConfigurations } from "./mail";
import { uploadsConfigurations } from "./uploads";
import validationConfigurations from "./validation";

export const consoleLog = new ConsoleLog();

export default function loadConfigurations() {
  config.set({
    app: appConfigurations,
    auth: authConfigurations,
    http: httpConfigurations,
    validation: validationConfigurations,
    uploads: uploadsConfigurations,
  });

  // Database configurations
  setDatabaseConfigurations(databaseConfigurations);

  // Mail Configurations
  setMailConfigurations(mailConfigurations);

  // log configurations
  logger.configure({
    // channels: [new JSONFileTypedLog(), consoleLog],
    channels: [consoleLog],
  });
}
