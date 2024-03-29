import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { getProject } from "./get-project";
import { getProjectVersions } from "./get-project-versions";
import { getProjects } from "./get-projects";
import { getVersion } from "./get-version";
import { getVersionFromHashes } from "./get-version-from-hash";
import { getVersions } from "./get-versions";
import { search } from "./search";
import { getCategories } from "./tags/get-categories";
import { getGameVersions } from "./tags/get-game-versions";
import { getLoaders } from "./tags/get-loaders";
import { getSides } from "./tags/get-sides";

export interface CreateClientOptions {
  apiKey?: string;
  userAgent: string;
}

export const createModrinthClient = (options: CreateClientOptions) => {
  const { apiKey, userAgent } = options;
  const headers = {} as Record<string, string>;
  if (apiKey) {
    headers["Authorization"] = apiKey;
  }
  headers["User-Agent"] = userAgent;
  const axiosClient = setupCache(
    axios.create({
      baseURL: "https://api.modrinth.com/v2",
      headers,
    }),
    {
      ttl: 1000 * 60 * 15,
    },
  );
  return {
    search: search.bind(null, axiosClient),
    getProject: getProject.bind(null, axiosClient),
    getProjects: getProjects.bind(null, axiosClient),
    getProjectVersions: getProjectVersions.bind(null, axiosClient),
    tags: {
      getCategories: getCategories.bind(null, axiosClient),
      getGameVersions: getGameVersions.bind(null, axiosClient),
      getLoaders: getLoaders.bind(null, axiosClient),
      getSides: getSides.bind(null, axiosClient),
    },
    getVersionFromHashes: getVersionFromHashes.bind(null, axiosClient),
    getVersion: getVersion.bind(null, axiosClient),
    getVersions: getVersions.bind(null, axiosClient),
  };
};

export type ModrinthClient = ReturnType<typeof createModrinthClient>;
