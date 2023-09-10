import { instanceManager } from "./instance-manager";

export const deleteInstance = async (instancePath: string) => {
  const instance = instanceManager.getInstance(instancePath);
  if (!instance) {
    return;
  }
  await instanceManager.removeInstance(instance);
};
