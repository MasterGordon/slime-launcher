import { createHash } from "crypto";
import fs from "fs-extra";

export const getHash = async (path: string, algo: "sha512" | "sha1") => {
  const fileBuffer = await fs.readFile(path);
  const hashSum = createHash(algo);
  hashSum.update(fileBuffer);
  const hex = hashSum.digest("hex");
  return hex;
};
