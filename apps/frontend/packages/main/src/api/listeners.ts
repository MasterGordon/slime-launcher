import { ipcMain } from "electron-better-ipc";
import { instanceManager } from "@slime-launcher/piston";
import { BrowserWindow } from "electron";
import type { Queries } from "./queries";
import chalk from "chalk";

const forceRevalidate = (query: keyof Queries) => {
  const window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed());
  if (!window) return;
  if (import.meta.env.DEV) {
    console.info(chalk.bgMagentaBright.black(`[force-revalidate]`), query);
  }
  ipcMain.callRenderer(window, "force-revalidate", query);
};

export const registerListeners = () => {
  instanceManager.onInstancesChange(() => {
    forceRevalidate("getInstances");
  });
};
