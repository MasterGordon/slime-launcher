import path from "path";
import getAppData from "../utils/get-app-data";

export const getInstancesPath = () => {
  const appData = getAppData();
  return path.join(appData, "instances");
};
