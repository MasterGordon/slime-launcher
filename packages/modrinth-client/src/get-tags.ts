import type { Axios } from "axios";

export type Tag =
  | "category"
  | "loader"
  | "game_version"
  | "donation_platform"
  | "report_type"
  | "project_type"
  | "side_type";

interface Loader {
  icon: string;
  name: string;
  supported_project_types: string[];
}

export const getTags = async <T extends Tag>(axiosClient: Axios, tag: T) => {
  const response = await axiosClient.get<
    T extends "loader" ? Loader[] : string[]
  >(`/tag/${tag}`);
  return response.data;
};
