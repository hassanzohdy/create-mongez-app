import mongezVite from "@mongez/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, UserConfigExport } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      svgr({
        exportAsDefault: true,
      }),
      mongezVite(),
      react(),
    ],
    envPrefix: "APP_",
  } as UserConfigExport;
});
