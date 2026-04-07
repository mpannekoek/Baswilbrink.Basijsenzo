import path from "node:path";

import { defineConfig } from "drizzle-kit";

const configuredDatabasePath = process.env.CONTENT_DB_PATH?.trim();

const databasePath = configuredDatabasePath
  ? path.isAbsolute(configuredDatabasePath)
    ? configuredDatabasePath
    : path.resolve(/* turbopackIgnore: true */ process.cwd(), configuredDatabasePath)
  : path.resolve(/* turbopackIgnore: true */ process.cwd(), "data", "content.db");

export default defineConfig({
  dialect: "sqlite",
  out: "./drizzle",
  schema: "./lib/db/schema.ts",
  dbCredentials: {
    url: databasePath,
  },
  strict: true,
  verbose: true,
});
