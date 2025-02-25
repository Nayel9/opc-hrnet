import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    sourcemap: false,
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
