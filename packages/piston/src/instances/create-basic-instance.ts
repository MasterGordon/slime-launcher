import { ModLoaderType } from "curse-client";
import fs from "fs-extra";
import path from "path";
import getAppData from "../utils/get-app-data";
import type { Instance } from "./Instance";
import { downloadLoader } from "./download-loader";

type MinecraftVersionType = "release" | "snapshot" | "old_beta" | "old_alpha";

export interface CreateInstanceOptions {
  name: string;
  loaderType: "vanilla" | "forge" | "fabric" | "quilt";
  version: string;
  versionType: MinecraftVersionType;
  memory: number;
  loaderVersion?: string;
  path: string;
}

const flavorToModLoaderType: Record<
  CreateInstanceOptions["loaderType"],
  ModLoaderType | undefined
> = {
  vanilla: undefined,
  forge: ModLoaderType.Forge,
  fabric: ModLoaderType.Fabric,
  quilt: ModLoaderType.Quilt,
};

export const createBasicInstance = async (options: CreateInstanceOptions) => {
  const loaderType = flavorToModLoaderType[options.loaderType];
  const appData = getAppData();
  const instancePath = path.join(appData, "instances", options.name);
  await fs.ensureDir(instancePath);

  const instance: Instance = {
    name: options.name,
    mods: [],
    minecraftVersion: options.version,
    loaderType,
    loaderVersion: options.loaderVersion,
    memory: options.memory,
  };
  await fs.writeJSON(path.join(instancePath, "instance.json"), instance);

  const loaderData = await downloadLoader(loaderType, {
    version: options.version,
    loaderVersion: options.loaderVersion ?? "",
    instancePath,
  });
  Object.assign(instance, loaderData);
};
