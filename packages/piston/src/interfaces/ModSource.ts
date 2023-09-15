import type { InstanceMod } from "../instances/Instance";

export interface ModSourceMod {
  id: string | number;
  title: string;
  body: string;
  logo?: string;
  categories: string[];
  downloads: number;
  created: Date;
  updated: Date;
}

interface SearchResult {
  results: ModSourceMod[];
  total: number;
  offset: number;
  limit: number;
}

export interface ModSource {
  id: string;
  getFilterOptions(): Promise<Record<string, string[]>>;
  getMod(id: string): Promise<ModSourceMod>;
  getModFromHash(filePath: string): Promise<InstanceMod>;
  search(query: string, offset: number): Promise<SearchResult>;
}
