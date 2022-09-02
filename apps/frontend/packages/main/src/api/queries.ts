import { ipcMain } from "electron-better-ipc";
import { getAccounts } from "../account";
import { downloadStatus } from "downloader";
import { validateJava } from "../settings";

export const queries = {
  getAccounts,
  downloadStatus: () => downloadStatus,
  validateJava,
};

type Event = {
  type: keyof typeof queries;
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
