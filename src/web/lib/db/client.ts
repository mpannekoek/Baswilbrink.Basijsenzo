import fs from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import { applyContentSchema } from "./schema";
import * as schema from "./schema";

const DEFAULT_DATABASE_PATH = path.join(/* turbopackIgnore: true */ process.cwd(), "data", "content.db");

function resolveDatabasePath(env = process.env): string {
  const configuredPath = env.CONTENT_DB_PATH?.trim();

  if (!configuredPath) {
    return DEFAULT_DATABASE_PATH;
  }

  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.resolve(/* turbopackIgnore: true */ process.cwd(), configuredPath);
}

function ensureDatabaseDirectory(databasePath: string): void {
  if (databasePath === ":memory:") {
    return;
  }

  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
}

export interface ContentDatabaseClient {
  databasePath: string;
  sqlite: Database.Database;
  db: BetterSQLite3Database<typeof schema>;
}

export function createContentDatabaseClient(databasePath = resolveDatabasePath()): ContentDatabaseClient {
  ensureDatabaseDirectory(databasePath);

  const sqlite = new Database(databasePath);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  applyContentSchema(sqlite);

  return {
    databasePath,
    sqlite,
    db: drizzle(sqlite, { schema }),
  };
}

const globalForContentDatabase = globalThis as {
  __contentDatabaseClient?: ContentDatabaseClient;
};

export function getContentDatabaseClient(): ContentDatabaseClient {
  if (!globalForContentDatabase.__contentDatabaseClient) {
    globalForContentDatabase.__contentDatabaseClient = createContentDatabaseClient();
  }

  return globalForContentDatabase.__contentDatabaseClient;
}

export function getContentDatabase() {
  return getContentDatabaseClient().db;
}

export function getContentSqlite() {
  return getContentDatabaseClient().sqlite;
}

export const contentDatabasePath = resolveDatabasePath();
