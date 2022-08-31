import { Axios } from "axios";
import { Mod } from "./interface";

export const getMod = async (axiosClient: Axios, modId: number) => {
  const response = await axiosClient.get<{ data: Mod }>(`/mod/${modId}`);
  return response.data.data;
};
