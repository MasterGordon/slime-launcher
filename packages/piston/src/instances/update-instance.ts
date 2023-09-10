import { instanceManager } from "./instance-manager";

export const updateInstance: typeof instanceManager.updateInstance = (
  instancePath,
  update,
) => {
  return instanceManager.updateInstance(instancePath, update);
};
