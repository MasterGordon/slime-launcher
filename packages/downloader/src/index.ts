import fs from "fs-extra";
import axios from "axios";
import path from "path";
import { PromisePool } from "@supercharge/promise-pool";

interface DownloadStatus {
  progress: number;
  goal: number;
  current: string;
}

export const downloadStatus: DownloadStatus = {
  progress: 0,
  goal: 0,
  current: "",
};

export const downloadMultipleFiles = async (
  urls: string[],
  targetDir: string,
  maxConcurrent: number = 3
) => {
  const pool = new PromisePool().for(urls).withConcurrency(maxConcurrent);
  downloadStatus.goal = urls.length;
  await pool.process(async (url) => {
    downloadStatus.current = url;
    const fileName = url.split("/").pop() || "";
    const filePath = path.join(targetDir, fileName);
    await downloadFile(url, filePath);
    downloadStatus.progress++;
  });
};

export const downloadFile = async (
  downloadUrl: string,
  filename: string,
  reportProgress?: boolean
) => {
  await fs.ensureDir(path.join(filename, ".."));
  const file = fs.createWriteStream(filename);
  const { data, headers } = await axios({
    method: "get",
    url: downloadUrl,
    responseType: "stream",
  });
  const contentLength = parseInt(headers["content-length"] || "0", 10);
  if (reportProgress) {
    let total = 0;
    downloadStatus.goal = contentLength;
    downloadStatus.current = downloadUrl;
    data.on("data", (chunk: { length: number }) => {
      total += chunk.length;
      downloadStatus.progress = total;
    });
  }
  data.pipe(file);
  return new Promise<void>((resolve, reject) => {
    file.on("finish", () => {
      file.close();
      resolve();
    });
    file.on("error", (err) => {
      fs.unlink(filename);
      reject(err);
    });
  });
};
