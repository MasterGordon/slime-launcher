import type { Instance, InstanceMod } from "./Instance";
import path from "path";
import { readForgeMod, readFabricMod } from "@xmcl/mod-parser";

export const getModMeta = async (
  instance: Instance,
  filePath: string,
): Promise<InstanceMod> => {
  try {
    switch (instance.loaderType) {
      case "forge": {
        const data = await readForgeMod(filePath);
        return {
          fileName: path.basename(filePath),
          title:
            data.modsToml[0]?.displayName ||
            data.mcmodInfo[0]?.name ||
            data.modAnnotations[0]?.name,
          version:
            data.modsToml[0]?.version ||
            data.mcmodInfo[0]?.version ||
            data.modAnnotations[0]?.version,
        };
      }
      case "fabric": {
        const data = await readFabricMod(filePath);
        return {
          fileName: path.basename(filePath),
          title: data.name,
          version: data.version,
        };
      }
      default: {
        return {
          fileName: path.basename(filePath),
        };
      }
    }
  } catch (e) {
    console.error(e);
    return {
      fileName: path.basename(filePath),
    };
  }
};
