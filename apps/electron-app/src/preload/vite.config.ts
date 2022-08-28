import { preload } from "unplugin-auto-expose";

const PACKAGE_ROOT = __dirname;

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: process.cwd(),
  build: {
    ssr: true,
    sourcemap: "inline",
    outDir: "prerender-dist",
    assetsDir: ".",
    minify: process.env.MODE !== "development",
    lib: {
      entry: "index.ts",
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "preload.cjs",
      },
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  plugins: [preload.vite()],
};

export default config;
