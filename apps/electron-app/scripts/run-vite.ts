import { createServer, InlineConfig, Plugin, build } from "vite";
import chalk from "chalk";
import config from "../vite.config";
import preloadConfig from "../src/preload/vite.config";
import { consoleViteMessagePrefix, srcPath } from "./common";
import { resolve } from "path";

function LoggerPlugin(): Plugin {
  return {
    name: "electron-scripts-logger",
    handleHotUpdate: (ctx) => {
      for (const file of ctx.modules) {
        const path = file.file.replace(srcPath, "");
        console.log(
          chalk.yellow(consoleViteMessagePrefix),
          chalk.yellow("hmr update"),
          chalk.grey(path)
        );
      }
      return ctx.modules;
    },
  };
}

export default async function startViteServer(): Promise<() => Promise<void>> {
  const cfg = config as InlineConfig;
  const server = await createServer({
    ...cfg,
    configFile: false,
    logLevel: "silent",
    server: { port: 3000 },
    plugins: [...(cfg.plugins ?? []), LoggerPlugin()],
  });

  const preloadCfg = preloadConfig as InlineConfig;
  await build({
    ...preloadCfg,
    build: {
      ...cfg.build,
      watch: {},
    },
    configFile: false,
    plugins: [...(cfg.plugins ?? []), LoggerPlugin()],
  });

  await server.listen();
  const address = server.httpServer.address();
  if (typeof address === "object") {
    const port = address.port;
    console.log(
      chalk.green(consoleViteMessagePrefix),
      chalk.green(`Dev server running at: localhost:${port}`)
    );
  }
  return async () => {
    await server.close();
  };
}
