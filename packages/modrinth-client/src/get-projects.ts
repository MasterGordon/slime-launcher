import type { Axios } from "axios";
import type { Project } from "./interface";

export const getProjects = async (axiosClient: Axios, projectIds: string[]) => {
  const url = new URLSearchParams();
  url.append("ids", JSON.stringify(projectIds));
  const response = await axiosClient.get<Project[]>(
    `/projects?${url.toString()}`,
  );
  return response.data;
};
