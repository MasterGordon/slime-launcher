import { resolve } from "path";
import { defineConfig } from "vite";
// import reactRefresh from "@vitejs/plugin-react-refresh";
import react from "@vitejs/plugin-react";

export default defineConfig({
  //plugins: [reactRefresh()],
  plugins: [react()],
  server: {},
  base: "./",
  root: resolve("./src/renderer"),

  build: {
    outDir: resolve("./dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve("./src/renderer/main.tsx"),
      },
    },
  },
});
