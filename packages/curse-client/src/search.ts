import { axiosClient } from "./axios-client";

export enum ModsSearchSortField {
  Featured = 1,
  Popularity = 2,
  LastUpdated = 3,
  Name = 4,
  Author = 5,
  TotalDownloads = 6,
  Category = 7,
  GameVersion = 8,
}

export type SortOrder = "asc" | "desc";

export enum ModLoaderType {
  Any = 0,
  Forge = 1,
  Cauldron = 2,
  LiteLoader = 3,
  Fabric = 4,
  Quilt = 5,
}

export interface SearchParameters {
  /** Filter by game id. */
  gameId: number;
  /** Filter by section id (discoverable via Categories) */
  classId?: number;
  /** Filter by category id */
  categoryId?: number;
  /** Filter by game version string */
  gameVersion?: string;
  /** Filter by free text search in the mod name and author */
  searchFilter?: string;
  /** Filter by ModsSearchSortField enumeration */
  sortField?: ModsSearchSortField;
  /** 'asc' if sort is in ascending order, 'desc' if sort is in descending order */
  sortOrder?: SortOrder;
  /** Filter only mods associated to a given modloader (Forge, Fabric ...). Must be coupled with gameVersion. */
  modLoaderType?: ModLoaderType;
  /** Filter only mods that contain files tagged with versions of the given gameVersionTypeId */
  gameVersionTypeId?: number;
  /** Filter by slug (coupled with classId will result in a unique result). */
  slug?: string;
  /**	A zero based index of the first item to include in the response, */
  index?: number;
  /** The number of items to include in the response, */
  pageSize?: number;
}

export const search = async (query: SearchParameters) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    params.append(key, value);
  });
  const response = await axiosClient.get(
    `/v1/mods/search?${params.toString()}`
  );
  return response.data;
};
