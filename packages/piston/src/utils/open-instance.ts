import { spawn } from "child_process";
import os from "os";
import path from "path";
import { getInstancesPath } from "../instances/get-instances-path";

const fileManager: Record<NodeJS.Platform, string> = {
  linux: "xdg-open",
  win32: "explorer.exe",
  darwin: "open",
  openbsd: "open",
  freebsd: "open",
  sunos: "open",
  aix: "open",
  haiku: "open",
  android: "open",
  cygwin: "explorer.exe",
  netbsd: "open",
};

export const openInstance = (instance: string) => {
  const fileManagerPath = fileManager[os.platform()];
  const instancesPath = getInstancesPath();
  spawn(fileManagerPath, [path.join(instancesPath, instance)], {
    detached: true,
  });
};
