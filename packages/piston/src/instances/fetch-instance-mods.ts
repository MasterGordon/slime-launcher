import fs from "fs-extra";
import path from "path";
import { getInstancesPath } from "./get-instances-path";
import { instanceManager } from "./instance-manager";
import type { InstanceMod } from "./Instance";
import { getModMeta } from "./get-mod-meta";

export const fetchInstanceMods = async (
  instancePath: string,
): Promise<void> => {
  const basePath = getInstancesPath();
  const instanceModsPath = path.join(basePath, instancePath, "mods");
  const mods = await fs.readdir(instanceModsPath);
  const instance = instanceManager.getInstance(instancePath);
  if (!instance) {
    return;
  }
  const updatedMods = (
    await Promise.all(
      mods.map<Promise<InstanceMod | undefined>>(async (mod) => {
        const instanceMod = instance.mods.find((m) => m.fileName === mod);
        const stat = await fs.stat(path.join(instanceModsPath, mod));
        if (stat.isDirectory()) return undefined;
        if (!mod.endsWith(".jar.disabled") && !mod.endsWith(".jar"))
          return undefined;
        if (instanceMod) {
          return instanceMod;
        } else {
          return await getModMeta(instance, path.join(instanceModsPath, mod));
        }
      }),
    )
  ).filter((mod) => mod !== undefined) as InstanceMod[];
  await instanceManager.updateInstance(instancePath, {
    mods: updatedMods,
  });
};
