import fs from "fs-extra";
import path from "path";
import getAppData from "../utils/get-app-data";
import type { Instance, ModLoaderType } from "./Instance";
import { initialInstanceState } from "./Instance";
import { downloadLoader } from "./download-loader";
import { instanceManager } from "./instance-manager";

type MinecraftVersionType = "release" | "snapshot" | "old_beta" | "old_alpha";

export interface CreateInstanceOptions {
  name: string;
  loaderType: "vanilla" | "forge" | "fabric";
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
  forge: "forge",
  fabric: "fabric",
};

export const createBasicInstance = async (options: CreateInstanceOptions) => {
  const loaderType = flavorToModLoaderType[options.loaderType];
  const appData = getAppData();
  const instancePath = path.join(appData, "instances", options.path);
  await fs.ensureDir(instancePath);

  const instance: Instance = {
    name: options.name,
    mods: [],
    minecraftVersion: options.version,
    loaderType,
    loaderVersion: options.loaderVersion,
    memory: options.memory,
    path: options.path,
    state: initialInstanceState,
  };

  const loaderData = await downloadLoader(loaderType, {
    version: options.version,
    loaderVersion: options.loaderVersion ?? "",
    instancePath,
  });
  Object.assign(instance, loaderData);

  await instanceManager.addInstance(instance);
  console.log("created");
};
