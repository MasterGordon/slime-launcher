import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
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
    headers["x-api-key"] = apiKey;
  }
  const axiosClient = setupCache(
    axios.create({
      baseURL: "https://api.curse.tools/v1/cf",
      headers,
    }),
    {
      ttl: 1000 * 60 * 15,
    }
  );
  return {
    search: search.bind(null, axiosClient),
    getMod: getMod.bind(null, axiosClient),
    getMods: getMods.bind(null, axiosClient),
    getModDescription: getModDescription.bind(null, axiosClient),
    getModFiles: getModFiles.bind(null, axiosClient),
  };
};
