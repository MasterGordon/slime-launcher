import { ipcMain } from "electron-better-ipc";
import {
  getAccounts,
  getSettings,
  validateJava,
  getMinecraftVersions,
  getForgeVersions,
  getFabricLoaderVersions,
  getFabricSupportedVersions,
  getInstancesPath,
  getMaxMemory,
} from "piston";
import { downloadStatus } from "downloader";
import { instanceManager } from "piston";
import { inspect } from "util";
import chalk from "chalk";

export const queries = {
  getAccounts,
  downloadStatus: () => downloadStatus,
  validateJava,
  getSettings,
  getMinecraftVersions,
  getForgeVersions,
  getFabricLoaderVersions,
  getFabricSupportedVersions,
  getInstancesPath,
  getMaxMemory,
  getInstances: instanceManager.getInstances,
};

type Event = {
  type: keyof Queries;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export type Queries = typeof queries;

export const registerQueryIpc = (): void => {
  ipcMain.answerRenderer("query", async (event: Event) => {
    const result = await queries[event.type](event.data);
    if (import.meta.env.DEV) {
      console.info(
        chalk.bgGreenBright.black(`[query]`),
        event.type,
        inspect(event.data, {
          depth: 1,
        }),
        "=>",
        inspect(result, {
          depth: 1,
        }),
      );
    }
    return result;
  });
};
