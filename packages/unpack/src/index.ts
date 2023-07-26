import fs from "fs-extra";
import AdmZip from "adm-zip";
import tar from "tar";

export const unpack = async (file: string, target: string) => {
  if (file.endsWith(".zip")) {
    return unpackZip(file, target);
  } else {
    return unpackTarGz(file, target);
  }
};

export const unpackTarGz = async (file: string, target: string) => {
  const tarStream = tar.x({
    C: target,
    strip: 1,
  });

  const fileStream = fs.createReadStream(file);

  fileStream.pipe(tarStream);

  return new Promise<void>((resolve, reject) => {
    tarStream.on("finish", () => {
      resolve();
    });

    tarStream.on("error", (err) => {
      reject(err);
    });
  });
};

export const unpackZip = async (file: string, target: string) => {
  const zip = new AdmZip(file);
  zip.extractAllTo(target, true);
};

export default unpack;
