import { Axios } from "axios";
import { ModFile, ModLoaderType, Pagination } from "./interface";

export interface ModFileParams {
  gameVersion?: string;
  modLoaderType?: ModLoaderType;
  gameVersionTypeId?: number;
  index?: number;
  pageSize?: number;
}

export const getModFiles = async (
  axiosClient: Axios,
  modId: number,
  query: ModFileParams
) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    params.append(key, String(value));
  });
  const response = await axiosClient.get<{
    data: ModFile[];
    pagination: Pagination;
  }>(`/mod/${modId}/files?${params.toString()}`);
  return response.data;
};
