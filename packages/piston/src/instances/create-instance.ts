import { ModLoaderType } from "curse-client";
import fs from "fs-extra";
import path from "path";
import getAppData from "../utils/get-app-data";

type MinecraftVersionType = "release" | "snapshot" | "old_beta" | "old_alpha";

interface CreateInstanceOptions {
  name: string;
  slug: string;
  flavor: "vanilla" | "forge" | "fabric" | "quilt";
  version: string;
  type: MinecraftVersionType;
  memory: number;
  loaderVersion?: string;
}

const flavorToModLoaderType: Record<
  CreateInstanceOptions["flavor"],
  ModLoaderType | undefined
> = {
  vanilla: undefined,
  forge: ModLoaderType.Forge,
  fabric: ModLoaderType.Fabric,
  quilt: ModLoaderType.Quilt,
};

export const createInstance = async (options: CreateInstanceOptions) => {
  const loaderType = flavorToModLoaderType[options.flavor];
  const appData = getAppData();
  await fs.ensureDir(path.join(appData, "instances", options.slug));
};
