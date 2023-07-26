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
      console.log(`[query] ${event.type}`, event.data, "=>", result);
    }
    return result;
  });
};
