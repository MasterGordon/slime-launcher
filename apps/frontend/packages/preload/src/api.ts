import {ipcRenderer} from 'electron-better-ipc';
import type {Api} from '../../main/src/api';

export const api = {
  print: (text: string) => {
    console.log(text);
  },
  invoke: async <Type extends keyof Api>(type: Type, data: Parameters<Api[Type]>[0]) => {
    return await ipcRenderer.callMain('api', {type, data});
  },
};
