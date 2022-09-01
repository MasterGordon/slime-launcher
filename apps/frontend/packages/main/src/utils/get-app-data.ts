import path from "path";
import fs from "fs-extra";

const getAppData = (): string => {
  const systemAppData =
    process.env.APPDATA ||
    (process.platform == "darwin"
      ? process.env.HOME + "/Library/Preferences"
      : process.env.HOME + "/.local/share");
  const appName = "glauncher";

  const appData = path.join(systemAppData, appName).replace(/\\/g, "/");
  fs.ensureDir(appData);
  return appData;
};

export default getAppData;
