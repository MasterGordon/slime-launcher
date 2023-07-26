import { ModLoaderType } from "curse-client";
import path from "path";
import fs from "fs-extra";
import type { Instance } from "./Instance";
import { downloadFile } from "downloader";
import semver from "semver";

interface LoaderOptions {
  version: string;
  loaderVersion: string;
  instancePath: string;
}

const getForgeDownloadUrl = (
  forgeName: string,
  jarType: "installer" | "universal"
) =>
  `https://maven.minecraftforge.net/net/minecraftforge/forge/${forgeName}/forge-${forgeName}-${jarType}.jar`;

const getFabricDownloadUrl = (gameVersion: string, loaderVersion: string) =>
  `https://meta.fabricmc.net/v2/versions/loader/${gameVersion}/${loaderVersion}/profile/json`;

const loaderDownloader: Partial<
  Record<ModLoaderType, (options: LoaderOptions) => Promise<Partial<Instance>>>
> = {
  [ModLoaderType.Fabric]: async ({ version, instancePath, loaderVersion }) => {
    const fabricName = `fabric-loader-${loaderVersion}-${version}`;
    const versionPath = path.join(instancePath, "versions");
    await fs.ensureDir(path.join(versionPath, fabricName));
    const customVersion = fabricName;
    await downloadFile(
      getFabricDownloadUrl(version, loaderVersion),
      path.join(versionPath, fabricName, fabricName + ".json")
    );
    return { customVersion };
  },
  [ModLoaderType.Forge]: async ({ version, instancePath, loaderVersion }) => {
    const jarType = semver.gt(version, "1.12.0", true)
      ? "installer"
      : "universal";
    const forgeName = version + "-" + loaderVersion;
    const forgeJarName = "forge-" + forgeName + ".jar";
    const forgePath = path.join(instancePath, forgeJarName);
    await downloadFile(getForgeDownloadUrl(forgeName, jarType), forgePath);
    return { forge: forgeJarName };
  },
};

export const downloadLoader = async (
  loaderType: ModLoaderType | undefined,
  options: LoaderOptions
) => {
  const downloader = loaderType && loaderDownloader[loaderType];
  if (!downloader) {
    return {};
  }
  return await downloader(options);
};
