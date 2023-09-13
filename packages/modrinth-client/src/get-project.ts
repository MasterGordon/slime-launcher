import type { Axios } from "axios";
import type { Project } from "./interface";

export const getProject = async (axiosClient: Axios, idOrSlug: string) => {
  const response = await axiosClient.get<Project>(`/project/${idOrSlug}`);
  return response.data;
};
