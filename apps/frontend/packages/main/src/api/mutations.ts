import { ipcMain } from "electron-better-ipc";
import {
  removeAccount,
  addOfflineAccount,
  addMicrosoftAccount,
  setActiveAccount,
  setupJava,
  updateSettings,
} from "piston";

export const mutate = {
  addMicrosoftAccount,
  removeAccount,
  addOfflineAccount,
  setActiveAccount,
  setupJava,
  updateSettings,
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
      console.log(`[mutate] ${event.type}`, event.data);
    }
    // @ts-expect-error - we don't know the type of data
    return mutate[event.type](event.data);
  });
};
