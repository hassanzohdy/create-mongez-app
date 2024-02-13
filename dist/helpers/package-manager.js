import { execSync } from "child_process";
let detectedPackageManager;
export function getPackageManager() {
    // detect package manager by running an exec command
    // available package managers: npm, yarn, pnpm
    // check if package manager is installed globally
    if (detectedPackageManager) {
        return detectedPackageManager;
    }
    try {
        execSync("yarn --version", { stdio: "ignore" });
        detectedPackageManager = "yarn";
        return "yarn";
    }
    catch (e) {
        try {
            execSync("pnpm --version", { stdio: "ignore" });
            detectedPackageManager = "pnpm";
            return "pnpm";
        }
        catch (e) {
            detectedPackageManager = "npm";
            return "npm";
        }
    }
}
export function installCommand() {
    return `${getPackageManager()} install`;
}
export function startCommand() {
    if (getPackageManager() === "npm")
        return "npm run start";
    return `${getPackageManager()} start`;
}
