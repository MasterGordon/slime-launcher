import { ipcRenderer } from "electron-better-ipc";
import type { Queries, Mutations } from "../../main/src/api";

export type QueryType = keyof Queries;
export type MutationType = keyof Mutations;
export type QueryParams<T extends QueryType> = Parameters<Queries[T]>[0];
export type MutationParams<T extends MutationType> = Parameters<
  Mutations[T]
>[0];
export type { Queries, Mutations } from "../../main/src/api";

export const api = {
  query: async <Type extends QueryType>(
    type: Type,
    data: QueryParams<Type>,
  ) => {
    return (await ipcRenderer.callMain("query", { type, data })) as ReturnType<
      Queries[Type]
    >;
  },
  mutate: async <Type extends MutationType>(
    type: Type,
    data: MutationParams<Type>,
  ) => {
    return (await ipcRenderer.callMain("mutate", { type, data })) as ReturnType<
      Mutations[Type]
    >;
  },
};

export const onForceRevalidate = (listener: (query: QueryType) => void) => {
  const ls: Parameters<(typeof ipcRenderer)["on"]>[1] = (query) => {
    listener(query as unknown as QueryType);
  };
  ipcRenderer.answerMain("force-revalidate", ls);
  return () => {
    ipcRenderer.removeListener("force-revalidate", ls);
  };
};
