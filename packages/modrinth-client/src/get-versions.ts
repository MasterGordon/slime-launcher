import type { Axios } from "axios";
import type { Version } from "./interface";

export const getVersions = async (axiosClient: Axios, versionIds: string[]) => {
  const searchParams = new URLSearchParams();
  searchParams.append("ids", JSON.stringify(versionIds));
  const response = await axiosClient.get<Version[]>(
    `/versions?${searchParams.toString()}`,
  );
  return response.data;
};
