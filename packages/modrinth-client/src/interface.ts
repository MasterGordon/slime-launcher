export interface Project {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  client_side: "required" | "optional" | "unsupported";
  server_side: "required" | "optional" | "unsupported";
  body: string;
  status:
    | "approved"
    | "archived"
    | "rejected"
    | "draft"
    | "unlisted"
    | "processing"
    | "withheld"
    | "scheduled"
    | "private"
    | "unknown";
  requested_status?: "approved" | "archived" | "unlisted" | "private" | "draft";
  additional_categories: string[];
  issues_url?: string;
  source_url?: string;
  wiki_url?: string;
  discord_url?: string;
  donation_urls: Array<{
    id: string;
    platform: string;
    url: string;
  }>;
  project_type: "mod" | "modpack" | "resourcepack" | "shader";
  downloads: number;
  icon_url?: string;
  color?: number;
  thread_id?: string;
  monetization_status?: "monetized" | "demonetized" | "force-demonetized";
  id: string;
  team: string;
  /** ISO-8601 Date */
  published: string;
  /** ISO-8601 Date */
  updated: string;
  /** ISO-8601 Date */
  approved?: string;
  /** ISO-8601 Date */
  queued?: string;
  followers: number;
  license?: {
    /** SPDX license ID */
    id: string;
    name: string;
    url?: string;
  };
  versions?: string[];
  game_versions?: string[];
  loaders?: string[];
  gallery?: Array<{
    url: string;
    featured: boolean;
    title?: string;
    description?: string;
    /** ISO-8601 Date */
    created: string;
    ordering: number;
  }>;
}

export interface SearchResult {
  slug: string;
  title: string;
  description: string;
  categories?: string[];
  client_side: "required" | "optional" | "unsupported";
  server_side: "required" | "optional" | "unsupported";
  project_type: "mod" | "modpack" | "resourcepack" | "shader";
  downloads: number;
  icon_url?: string;
  color?: number;
  thread_id?: string;
  monetization_status?: "monetized" | "demonetized" | "force-demonetized";
  project_id: string;
  author: string;
  display_categories?: string[];
  versions: string[];
  follows: number;
  /** ISO-8601 Date */
  date_created: string;
  /** ISO-8601 Date */
  date_modified: string;
  latest_version?: string;
  /** SPDX license ID */
  license: string;
  gallery?: string[];
  featured_gallery?: string;
  /** {project_id}-{dep_type} */
  dependencies?: `${string}-${string}`[];
}

export interface Version {
  name: string;
  version_number: string;
  changelog?: string;
  dependencies?: Array<{
    version_id?: string;
    project_id?: string;
    file_name?: string;
    dependency_type: "required" | "optional" | "incompatible" | "embedded";
  }>;
  game_versions: string[];
  version_type: "release" | "beta" | "alpha";
  loaders: string[];
  featured: boolean;
  status?:
    | "listed"
    | "archived"
    | "draft"
    | "unlisted"
    | "scheduled"
    | "unknown";
  requested_status?: "listed" | "archived" | "draft" | "unlisted";
  id: string;
  project_id: string;
  author_id: string;
  /** ISO-8601 Date */
  date_published: string;
  downloads: number;
  files: Array<{
    hashes: {
      sha512: string;
      sha1: string;
    };
    url: string;
    filename: string;
    primary: boolean;
    size: number;
    /** The type of the additional file, used mainly for adding resource packs to datapacks */
    file_type?: "required-resource-pack" | "optional-resource-pack";
  }>;
}

export type Facet =
  | "project_type"
  | "categories"
  | "versions"
  | "project_type"
  | "client_side"
  | "server_side"
  | "open_source";
