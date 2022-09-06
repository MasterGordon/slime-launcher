import axios from "axios";
import { constants } from "./constants";

export interface MinecraftVersion {
  id: string;
  releaseTime: string;
  type: "release" | "snapshot" | "old_beta" | "old_alpha";
}

export interface MinecraftVersions {
  latest: {
    release: string;
    snapshot: string;
  };
  versions: MinecraftVersion[];
}

export const getMinecraftVersions = async () => {
  const minecraftVersionsData = (
    await axios.get(constants.minecraftVersionManifest)
  ).data;
  const minecraftVersions: MinecraftVersions = {
    ...minecraftVersionsData,
  };
  return minecraftVersions;
};
