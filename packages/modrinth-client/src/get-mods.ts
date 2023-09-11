import type { Axios } from "axios";
import type { Mod } from "./interface";

export const getMods = async (axiosClient: Axios, modIds: number[]) => {
  const response = await axiosClient.post<{ data: Mod[] }>(`/mods`, {
    modIds,
  });
  return response.data.data;
};
