import { ConsoleLog } from "@mongez/logger";
import { LogConfigurations } from "@mongez/warlock";

export const consoleLog = new ConsoleLog();

const logConfigurations: LogConfigurations = {
  enabled: true,
  channels: [consoleLog],
};

export default logConfigurations;
