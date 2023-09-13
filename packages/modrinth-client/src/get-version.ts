import type { Axios } from "axios";
import type { Version } from "./interface";

export const getVersion = async (axiosClient: Axios, versionId: string) => {
  const response = await axiosClient.get<Version>(`/version/${versionId}`);
  return response.data;
};
