import { join } from "node:path";
import fs from "fs";
import { node } from "../../.electron-vendors.cache.json";

const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = join(PACKAGE_ROOT, "..", "..");

const getNodeModules = () => {
  const modules = fs.readdirSync(join(PROJECT_ROOT, "../../node_modules"));
  return modules.filter((m) => !m.startsWith("."));
};

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PROJECT_ROOT,
  ssr: {
    noExternal: getNodeModules().filter((m) => !m.includes("electron")),
  },
  build: {
    ssr: true,
    sourcemap: "inline",
    target: `node${node}`,
    outDir: "dist",
    assetsDir: ".",
    minify: process.env.MODE !== "development",
    lib: {
      entry: "src/index.ts",
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].cjs",
      },
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
};

export default config;
