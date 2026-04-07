import { contentDatabasePath } from "@/lib/db/client";

import { buildDefaultPersistableValues } from "./content-mappers";
import { logContentEvent } from "./content-logging";
import { seedContentStore } from "./content-repository";

export async function ensureContentSeeded(): Promise<{ seeded: boolean }> {
  try {
    const result = seedContentStore(buildDefaultPersistableValues());

    if (result.seeded) {
      logContentEvent({
        details: {
          databasePath: contentDatabasePath,
        },
        event: "content_seeded",
        level: "info",
        targetSection: "content-seed",
      });
    }

    return result;
  } catch (error) {
    logContentEvent({
      error,
      event: "content_seed_failed",
      level: "error",
      targetSection: "content-seed",
    });
    throw error;
  }
}
