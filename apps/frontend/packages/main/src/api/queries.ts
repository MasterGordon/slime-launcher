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

export const registerQueryIpc = (): void => {
  ipcMain.answerRenderer('query', async (event: Event) => {
    // @ts-expect-error Fix empty params
    const result = await queries[event.type](event.data);
    if (import.meta.env.DEV) {
      console.log(`[query] ${event.type}`, event.data, '=>', result);
    }
    return result;
  });
};
