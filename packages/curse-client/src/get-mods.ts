import { Axios } from "axios";
import { Mod } from "./interface";

export const getMods = async (axiosClient: Axios, modIds: number[]) => {
  const response = await axiosClient.post<{ data: Mod[] }>(`/mods`, {
    modIds,
  });
  return response.data.data;
};
