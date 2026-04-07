import { contentDatabasePath } from "../lib/db/client";
import { ensureContentSeeded } from "../lib/content/content-seed";

async function main() {
  const result = await ensureContentSeeded();

  console.info(
    JSON.stringify({
      databasePath: contentDatabasePath,
      seeded: result.seeded,
    }),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
