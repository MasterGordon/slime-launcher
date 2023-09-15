import type { Axios } from "axios";

export interface Category {
  icon: string;
  name: string;
  project_type: "mod" | "modpack" | "resourcepack" | "shader";
  header: string;
}

export const getCategories = async (axiosClient: Axios) => {
  const response = await axiosClient.get<Category[]>(`/tag/category`);
  return response.data;
};
