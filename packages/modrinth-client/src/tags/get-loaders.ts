import type { Axios } from "axios";

export interface Loader {
  icon: string;
  name: string;
  supported_project_types: string[];
}

export const getLoaders = async (axiosClient: Axios) => {
  const response = await axiosClient.get<Loader[]>(`/tag/loader`);
  return response.data;
};
