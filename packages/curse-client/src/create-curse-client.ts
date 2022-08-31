import axios from "axios";
import { getMod } from "./get-mod";
import { getModDescription } from "./get-mod-description";
import { getModFiles } from "./get-mod-files";
import { getMods } from "./get-mods";
import { search } from "./search";

export interface CreateClientOptions {
  apiKey?: string;
}

export const createCurseClient = (options: CreateClientOptions) => {
  const { apiKey } = options;
  const headers = {} as Record<string, string>;
  if (apiKey) {
    headers["X-api-key"] = apiKey;
  }
  const axiosClient = axios.create({
    baseURL: "https://api.curse.tools/v1/cf",
    headers,
  });
  return {
    search: search.bind(null, axiosClient),
    getMod: getMod.bind(null, axiosClient),
    getMods: getMods.bind(null, axiosClient),
    getModDescription: getModDescription.bind(null, axiosClient),
    getModFiles: getModFiles.bind(null, axiosClient),
  };
};
