import type { Axios } from "axios";

export interface GameVersion {
  version: string;
  version_type: "snapshot" | "release" | "beta" | "alpha";
  date: string;
  major: boolean;
}

export const getGameVersions = async (axiosClient: Axios) => {
  const response = await axiosClient.get<GameVersion[]>(`/tag/game_version`);
  return response.data;
};
