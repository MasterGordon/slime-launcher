import type { Axios } from "axios";

export const getSides = async (axiosClient: Axios) => {
  const response = await axiosClient.get<string[]>(`/tag/side_type`);
  return response.data;
};
