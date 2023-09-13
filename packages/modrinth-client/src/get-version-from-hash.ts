import type { Axios } from "axios";
import { getHash } from "./hash-utils";
import type { Version } from "./interface";

export const getVersionFromHashes = async (
  axiosClient: Axios,
  filePath: string,
) => {
  const hash = await getHash(filePath, "sha512");
  const searchParams = new URLSearchParams();
  searchParams.append("algorithm", "sha512");
  const response = await axiosClient.get<Version>(
    `/version_file/${hash}?${searchParams.toString()}`,
  );
  return response.data;
};
