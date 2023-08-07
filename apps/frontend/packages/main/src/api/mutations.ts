import chalk from "chalk";
import { ipcMain } from "electron-better-ipc";
import {
  removeAccount,
  addOfflineAccount,
  addMicrosoftAccount,
  setActiveAccount,
  setupJava,
  updateSettings,
  createBasicInstance,
  launchInstance,
  killInstance,
} from "@slime-launcher/piston";
import { inspect } from "util";

export const mutate = {
  addMicrosoftAccount,
  removeAccount,
  addOfflineAccount,
  setActiveAccount,
  setupJava,
  updateSettings,
  createBasicInstance,
  launchInstance,
  killInstance,
};

type Event = {
  type: keyof typeof mutate;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export type Mutations = typeof mutate;

export const registerMutationIpc = (): void => {
  ipcMain.answerRenderer("mutate", async (event: Event) => {
    if (import.meta.env.DEV) {
      console.info(
        chalk.bgBlueBright.black(`[mutation]`),
        event.type,
        inspect(event.data, {
          depth: 1,
        }),
      );
    }
    // @ts-expect-error - we don't know the type of data
    return mutate[event.type](event.data);
  });
};
