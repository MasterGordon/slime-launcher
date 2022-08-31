import {ipcMain} from 'electron-better-ipc';
import {addAccount, removeAccount} from '../account';

export const mutate = {
  addAccount,
  removeAccount,
};

type Event = {
  type: keyof typeof mutate;
  data: any;
};

export type Mutations = typeof mutate;

export const registerMutationIpc = (): void => {
  ipcMain.answerRenderer('mutate', async (event: Event) => {
    if (import.meta.env.DEV) {
      console.log(`[mutate] ${event.type}`, event.data);
    }
    return mutate[event.type](event.data);
  });
};
