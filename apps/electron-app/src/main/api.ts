import { ipcMain } from "electron-better-ipc";

export const api = {
  print: (text: string) => {
    console.log(text);
  },
  sum: (data: { a: number; b: number }) => {
    return data.a + data.b;
  },
};

type Event = {
  type: keyof typeof api;
  data: any;
};

export type Api = typeof api;

ipcMain.answerRenderer("api", async (event: Event) => {
  return api[event.type](event.data);
});
