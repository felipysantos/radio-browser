import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
  server: {
    host: "0.0.0.0",
  },
});
