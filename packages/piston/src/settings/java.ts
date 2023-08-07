import os from "os";
import path from "path";
import getAppData from "../utils/get-app-data";
import fs from "fs-extra";
import { spawn } from "child_process";
import unpack from "@slime-launcher/unpack";
import { glob } from "glob";
import { downloadFile, resetDownloadStatus } from "@slime-launcher/downloader";
import { updateSettings } from "./manage-settings";

const getOsName = () => {
  switch (os.platform()) {
    case "win32":
      return "windows";
    case "darwin":
      return "mac";
    default:
      return "linux";
  }
};

const getDownloadExt = () => {
  if (os.platform() == "win32") return ".zip";
  else return ".tar.gz";
};

const getJavaPath = () => {
  const appData = getAppData();
  return path.join(appData, "java");
};

const getDownloadFile = (version: number) => {
  const javaPath = getJavaPath();
  return path.join(javaPath, "cache", `jre-${version}${getDownloadExt()}`);
};

export const validateJava = async ({
  version,
  executable,
}: {
  version: number;
  executable: string;
}): Promise<boolean> => {
  if (!(await fs.pathExists(executable))) return false;
  return new Promise<boolean>((resolve) => {
    const process = spawn(executable, ["-version"]);

    process.on("error", () => {
      resolve(false);
    });

    process.stderr.on("data", (data) => {
      data = data.toString().split("\n")[0];
      const isVersion =
        new RegExp(`(java|openjdk) version "1\\.${version}`).test(data) ||
        new RegExp(`(java|openjdk) version "${version}\\.`).test(data);

      resolve(isVersion);
    });
  });
};

const installJava = async (version: number): Promise<void> => {
  const downloadFile = getDownloadFile(version);
  const javaPath = path.join(getJavaPath(), `jre-${version}`);
  await fs.ensureDir(javaPath);
  await unpack(downloadFile, javaPath);
  if (os.platform() != "win32")
    await fs.chmod(await getJavaVersionPath(version), 755);
};

const getJavaVersionPath = async (version: number): Promise<string> => {
  const globPattern = path.posix
    .join(getJavaPath(), `jre-${version}`, "**", "bin", "java{.exe,}")
    .replace(/\\/g, "/");
  const [javaPath] = glob.sync(globPattern);
  return javaPath;
};

const downloadJava = async (version: number): Promise<void> => {
  const osName = getOsName();
  const targetFile = getDownloadFile(version);

  await downloadFile(
    `https://api.adoptium.net/v3/binary/latest/${version}/ga/${osName}/${os.arch()}/jre/hotspot/normal/eclipse?project=jdk`,
    targetFile,
    true,
  );
};

export const setupJava = async (version: number) => {
  resetDownloadStatus();
  if (
    !(await validateJava({
      version,
      executable: await getJavaVersionPath(version),
    }))
  ) {
    await downloadJava(version);
    await installJava(version);
  }
  await updateSettings({
    javaPath: {
      [version]: await getJavaVersionPath(version),
    },
  });
};
