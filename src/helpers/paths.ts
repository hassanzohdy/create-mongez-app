import path from "path";

if (typeof global.__dirname === "undefined") {
  // as __dirname is not defined in esm modules, we need to define it manually
  global.__dirname = path.resolve();
}

export function template(templateName: string): string {
  return path.resolve(__dirname, "../", "../", "templates", templateName);
}

export function packageRoot(...paths: string[]): string {
  return path.resolve(__dirname, "../", "../", ...paths);
}
