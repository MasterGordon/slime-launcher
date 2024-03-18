import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import getAppData from "./get-app-data";
import path from "path";

const sqlite = new Database(path.join(getAppData(), "cache.db"), {
  verbose: console.log,
});
const db = drizzle(sqlite);

export const cacheManager = {};
