import type { Project } from "@slime-launcher/modrinth-client";
import { createModrinthClient } from "@slime-launcher/modrinth-client";
import type { ModSource, ModSourceMod } from "@slime-launcher/piston";
import path from "path";
import { getHash } from "./get-hash";

const client = createModrinthClient({
  userAgent: "slime-launcher",
});

const modrinthProjectToMod = (project: Project): ModSourceMod => {
  return {
    id: project.id,
    body: project.body,
    logo: project.icon_url,
    title: project.title,
    created: new Date(project.published),
    updated: new Date(project.updated),
    downloads: project.downloads,
    categories: project.categories,
  };
};

const sourceId = "modrinth";

export const modrinthSource: ModSource = {
  id: sourceId,
  async getMod(id) {
    const project = await client.getProject(id);
    return modrinthProjectToMod(project);
  },
  async search(query, offset) {
    const searchRes = await client.search({
      query,
      offset,
    });
    return {
      results: searchRes.hits.map<ModSourceMod>((res) => ({
        categories: res.categories ?? [],
        downloads: res.downloads,
        updated: new Date(res.date_modified),
        created: new Date(res.date_created),
        title: res.title,
        body: res.description,
        id: res.project_id,
        logo: res.icon_url,
      })),
      limit: searchRes.limit,
      total: searchRes.total_hits,
      offset: searchRes.offset,
    };
  },
  async getModFromHash(filePath) {
    const version = await client.getVersionFromHashes(filePath);
    const project = await client.getProject(version.project_id);
    return {
      title: project.title,
      modId: project.id,
      fileId: version.id,
      source: sourceId,
      fileName: path.basename(filePath),
      sha512: await getHash(filePath, "sha512"),
    };
  },
  async getFilterOptions() {
    const filterOptions: Record<string, string[]> = {};

    const categories = await client.tags.getCategories();
    const loaders = await client.tags.getLoaders();

    filterOptions.loader = loaders
      .filter((l) => l.supported_project_types.includes("modpack"))
      .map((l) => l.name);
    filterOptions.side = await client.tags.getSides();

    categories
      .filter((c) => c.project_type === "mod")
      .forEach((c) => {
        filterOptions[c.header] ??= [];
        filterOptions[c.header].push(c.name);
      });
    return filterOptions;
  },
};
