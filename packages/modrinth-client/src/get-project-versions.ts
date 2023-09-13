import type { Axios } from "axios";
import type { Project } from "./interface";

export interface GetProjectFilesParams {
  loaders?: string[];
  game_versions?: string[];
  featured?: boolean;
}

export const getProjectVersions = async (
  axiosClient: Axios,
  projectId: string,
  params?: GetProjectFilesParams,
) => {
  const searchParams = new URLSearchParams();
  if (params)
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(
        key,
        typeof value == "object" ? JSON.stringify(value) : String(value),
      );
    });
  const response = await axiosClient.get<Project[]>(
    `/project/${projectId}/version?${searchParams.toString()}`,
  );
  return response.data;
};
