import os from "os";

export const getMaxMemory = () => {
  const totalMemory = os.totalmem();
  return Math.floor(totalMemory / 1000 / 1000 / 1000);
};
