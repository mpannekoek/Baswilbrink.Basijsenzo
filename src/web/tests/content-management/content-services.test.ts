import { describe, expect, it } from "vitest";

import { contentAuditEntries } from "@/lib/db/schema";
import { createContentDatabaseClient } from "@/lib/db/client";
import { buildPersistableFieldValues, GROUPED_CONTENT_FIELDS } from "@/lib/content/content-keys";
import { defaultSiteContent } from "@/lib/content/default-site-content";
import {
  buildDefaultPersistableValues,
  toGroupedContentFormValues,
  toLandingPageContent,
} from "@/lib/content/content-mappers";
import {
  getStoredContentSnapshot,
  saveContentMutation,
  seedContentStore,
} from "@/lib/content/content-repository";

describe("content services", () => {
  it("seeds the content store only when it is empty", () => {
    const client = createContentDatabaseClient(":memory:");

    expect(seedContentStore(buildDefaultPersistableValues(), client)).toEqual({ seeded: true });
    expect(seedContentStore(buildDefaultPersistableValues(), client)).toEqual({ seeded: false });

    const content = toLandingPageContent(getStoredContentSnapshot(client));

    expect(content.hero.title).toBe(defaultSiteContent.hero.title);
    expect(content.featuredTaste.flavor).toBe(defaultSiteContent.featuredTaste.flavor);
    expect(content.openingHours[0]?.hours).toBe(defaultSiteContent.openingHours[0]?.hours);
  });

  it("persists grouped content changes together with an audit record", () => {
    const client = createContentDatabaseClient(":memory:");

    seedContentStore(buildDefaultPersistableValues(), client);

    const snapshot = getStoredContentSnapshot(client);
    const currentValues = toGroupedContentFormValues(snapshot);
    const nextValues = {
      ...currentValues,
      "contact.phoneLabel": "024 - 111 22 33",
      "hero.title": "Vers schepijs voor elke omweg",
    };

    saveContentMutation(
      {
        actor: {
          displayName: "Beheerder Bas",
          email: "admin@example.com",
        },
        afterSnapshot: JSON.stringify(nextValues),
        beforeSnapshot: JSON.stringify(currentValues),
        fieldValues: buildPersistableFieldValues(GROUPED_CONTENT_FIELDS, nextValues),
        targetSection: "grouped-content",
      },
      client,
    );

    const updatedContent = toLandingPageContent(getStoredContentSnapshot(client));
    const auditEntries = client.db.select().from(contentAuditEntries).all();

    expect(updatedContent.hero.title).toBe("Vers schepijs voor elke omweg");
    expect(updatedContent.contact.phoneLabel).toBe("024 - 111 22 33");
    expect(auditEntries).toHaveLength(1);
    expect(auditEntries[0]?.targetSection).toBe("grouped-content");
    expect(auditEntries[0]?.actorIdentifier).toBe("admin@example.com");
  });
});
