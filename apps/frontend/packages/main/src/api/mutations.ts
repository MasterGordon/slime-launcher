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

ipcMain.answerRenderer('api', async (event: Event) => {
  return mutate[event.type](event.data);
});
