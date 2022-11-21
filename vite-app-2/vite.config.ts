import mongezVite from "@mongez/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, UserConfigExport } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), mongezVite()],
    envPrefix: "APP_",
  } as UserConfigExport;
});
