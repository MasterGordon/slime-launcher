export interface Links {
  websiteUrl: string;
  wikiUrl: string;
  issuesUrl: string;
  sourceUrl: string;
}

export enum FileRelationType {
  EmbeddedLibrary = 1,
  OptionalDependency = 2,
  RequiredDependency = 3,
  Tool = 4,
  Incompatible = 5,
  Include = 6,
}

export interface Category {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  url: string;
  iconUrl: string;
  dateModified: string;
  isClass: boolean;
  classId: number;
  parentCategoryId: number;
}

export interface Author {
  id: number;
  name: string;
  url: string;
}

export enum HashAlgo {
  SHA1 = 1,
  MD5 = 2,
}

export interface Logo {
  id: number;
  modId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
}

export interface Screenshot {
  id: number;
  modId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
}

export interface Hash {
  value: string;
  algo: HashAlgo;
}

export interface SortableGameVersion {
  gameVersionName: string;
  gameVersionPadded: string;
  gameVersion: string;
  gameVersionReleaseDate: string;
  gameVersionTypeId?: number;
}

export interface Dependency {
  modId: number;
  relationType: FileRelationType;
}

export interface Module {
  name: string;
  fingerprint: unknown;
}

export interface ModFile {
  id: number;
  gameId: number;
  modId: number;
  isAvailable: boolean;
  displayName: string;
  fileName: string;
  releaseType: number;
  fileStatus: number;
  hashes: Hash[];
  fileDate: string;
  fileLength: number;
  downloadCount: number;
  downloadUrl: string;
  gameVersions: string[];
  sortableGameVersions: SortableGameVersion[];
  dependencies: Dependency[];
  alternateFileId: number;
  isServerPack: boolean;
  fileFingerprint: unknown;
  modules: Module[];
  serverPackFileId?: number;
}

export interface LatestFilesIndex {
  gameVersion: string;
  fileId: number;
  filename: string;
  releaseType: number;
  gameVersionTypeId?: number;
  modLoader?: number;
}

export interface Mod {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  links: Links;
  summary: string;
  status: number;
  downloadCount: number;
  isFeatured: boolean;
  primaryCategoryId: number;
  categories: Category[];
  classId: number;
  authors: Author[];
  logo: Logo;
  screenshots: Screenshot[];
  mainFileId: number;
  latestFiles: ModFile[];
  latestFilesIndexes: LatestFilesIndex[];
  dateCreated: string;
  dateModified: string;
  dateReleased: string;
  allowModDistribution?: boolean;
  gamePopularityRank: number;
  isAvailable: boolean;
  thumbsUpCount: number;
}

export interface Pagination {
  index: number;
  pageSize: number;
  resultCount: number;
  totalCount: number;
}

export interface SearchResults {
  data: Mod[];
  pagination: Pagination;
}

export enum ModLoaderType {
  Any = 0,
  Forge = 1,
  Cauldron = 2,
  LiteLoader = 3,
  Fabric = 4,
  Quilt = 5,
}
