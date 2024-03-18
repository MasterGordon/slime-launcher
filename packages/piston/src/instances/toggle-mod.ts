import { instanceManager } from "./instance-manager";

export const enableMod = async ({
  instancePath,
  fileName,
}: {
  instancePath: string;
  fileName: string;
}) => {
  instanceManager.enableMod(instancePath, fileName);
};

export const disableMod = async ({
  instancePath,
  fileName,
}: {
  instancePath: string;
  fileName: string;
}) => {
  instanceManager.disableMod(instancePath, fileName);
};
