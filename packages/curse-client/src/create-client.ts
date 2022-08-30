import axios from "axios";
import { search } from "./search";

export interface CreateClientOptions {
  apiKey: string;
}

export const createClient = (options: CreateClientOptions) => {
  const { apiKey } = options;
  const axiosClient = axios.create({
    baseURL: "https://api.curse.tools/v1/cf",
    headers: {
      "x-api-key": apiKey,
    },
  });
  return {
    search: search.bind(null, axiosClient),
  };
};
