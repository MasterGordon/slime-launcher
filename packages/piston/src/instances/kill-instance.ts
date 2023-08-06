import { instanceManager } from "./instance-manager";

export const killInstance = async (instancePath: string) => {
  const instanceProcess = instanceManager.getInstanceProcess(instancePath);
  if (!instanceProcess) {
    return;
  }
  instanceProcess.kill(9);
};
