import { ConsoleLog } from "@mongez/logger";
export const consoleLog = new ConsoleLog();
const logConfigurations = {
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
