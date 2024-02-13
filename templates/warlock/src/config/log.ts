import { ConsoleLog } from "@mongez/logger";
import { LogConfigurations } from "@mongez/warlock";

export const consoleLog = new ConsoleLog();

const logConfigurations: LogConfigurations = {
  enabled: true,
  development: {
    channels: [consoleLog],
  },
  test: {
    channels: [consoleLog],
  },
  production: {
    channels: [consoleLog],
  },
};

export default logConfigurations;
