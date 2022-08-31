import {ipcMain} from 'electron-better-ipc';
import {getAccounts} from '../account';

export const queries = {
  getAccounts,
};

type Event = {
  type: keyof typeof queries;
  data: any;
};

export type Queries = typeof queries;

ipcMain.answerRenderer('api', async (event: Event) => {
  return queries[event.type](event.data);
});
