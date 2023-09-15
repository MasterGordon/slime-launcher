import type { Axios } from "axios";
import type { Facet, SearchResult } from "./interface";

type FacetQueryOperator = ":" | "=" | "!=" | ">=" | ">" | "<=" | "<";
export type FacetQuery = `${Facet}${FacetQueryOperator}${string}`;

type Index = "relevance" | "downloads" | "follows" | "newest" | "updated";

export interface SearchParameters {
  query: string;
  facets?: Array<Array<FacetQuery>>;
  orderBy?: Index;
  offset?: number;
  limit?: number;
  /** Try to use facets if possible */
  filters?: string;
}

export interface SearchResults {
  hits: SearchResult[];
  offset: number;
  limit: number;
  total_hits: number;
}

export const search = async (axiosClient: Axios, query: SearchParameters) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    params.append(
      key,
      typeof value == "object" ? JSON.stringify(value) : String(value),
    );
  });
  const response = await axiosClient.get<SearchResults>(
    `/search?${params.toString()}`,
  );
  return response.data;
};
