import { ModLoaderType } from "curse-client";
import { downloadFile } from "downloader";
import fs from "fs-extra";
import path from "path";
import semver from "semver";
import getAppData from "../utils/get-app-data";
import type { Instance } from "./Instance";

type MinecraftVersionType = "release" | "snapshot" | "old_beta" | "old_alpha";

const getForgeDownloadUrl = (
  forgeName: string,
  jarType: "installer" | "universal"
) =>
  `https://maven.minecraftforge.net/net/minecraftforge/forge/${forgeName}/forge-${forgeName}-${jarType}.jar`;

const getFabricDownloadUrl = (gameVersion: string, loaderVersion: string) =>
  `https://meta.fabricmc.net/v2/versions/loader/${gameVersion}/${loaderVersion}/profile/json`;

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

  if (loaderType === ModLoaderType.Forge && options.loaderVersion) {
    const jarType = semver.gt(options.version, "1.12.0", true)
      ? "installer"
      : "universal";
    const forgeName = options.version + "-" + options.loaderVersion;
    const forgeJarName = "forge-" + forgeName + ".jar";
    instance.forge = forgeJarName;
    const forgePath = path.join(instancePath, forgeJarName);
    await downloadFile(getForgeDownloadUrl(forgeName, jarType), forgePath);
  }

  if (loaderType === ModLoaderType.Fabric && options.loaderVersion) {
    const fabricName = `fabric-loader-${options.loaderVersion}-${options.version}`;
    const versionPath = path.join(instancePath, "versions");
    await fs.ensureDir(path.join(versionPath, fabricName));
    instance.customVersion = fabricName;
    await downloadFile(
      getFabricDownloadUrl(options.version, options.loaderVersion),
      path.join(versionPath, fabricName, fabricName + ".json")
    );
  }
};
