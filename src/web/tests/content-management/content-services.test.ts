import { describe, expect, it } from "vitest";

import { contentAuditEntries } from "@/lib/db/schema";
import { createContentDatabaseClient } from "@/lib/db/client";
import {
  buildInitialFieldValues,
  buildPersistableFieldValues,
  FEATURED_TASTE_FIELDS,
  GALLERY_SHOWCASE_FIELDS,
  GROUPED_CONTENT_FIELDS,
} from "@/lib/content/content-keys";
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
    expect(content.galleryShowcase.images[0]?.src).toBe(defaultSiteContent.galleryShowcase.images[0]?.src);
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

  it("persists featured-taste photo updates", () => {
    const client = createContentDatabaseClient(":memory:");

    seedContentStore(buildDefaultPersistableValues(), client);

    const nextValues = {
      ...buildInitialFieldValues(FEATURED_TASTE_FIELDS),
      "featuredTaste.imagePrimarySrc": "/basijs1.jpg",
      "featuredTaste.imageSecondarySrc": "/basijs2.jpg",
    };

    saveContentMutation(
      {
        actor: {
          displayName: "Beheerder Bas",
          email: "admin@example.com",
        },
        afterSnapshot: JSON.stringify(nextValues),
        beforeSnapshot: JSON.stringify(buildInitialFieldValues(FEATURED_TASTE_FIELDS)),
        fieldValues: buildPersistableFieldValues(FEATURED_TASTE_FIELDS, nextValues),
        targetSection: "featured-taste",
      },
      client,
    );

    const updatedContent = toLandingPageContent(getStoredContentSnapshot(client));

    expect(updatedContent.featuredTaste.imagePrimarySrc).toBe("/basijs1.jpg");
    expect(updatedContent.featuredTaste.imageSecondarySrc).toBe("/basijs2.jpg");
  });

  it("persists gallery showcase image updates", () => {
    const client = createContentDatabaseClient(":memory:");

    seedContentStore(buildDefaultPersistableValues(), client);

    const nextValues = {
      ...buildInitialFieldValues(GALLERY_SHOWCASE_FIELDS),
      "galleryShowcase.images.0.src": "/basijs3.jpg",
      "galleryShowcase.images.0.alt": "Nieuwe eerste sliderfoto",
      "galleryShowcase.title": "Nieuwe galerijtitel",
    };

    saveContentMutation(
      {
        actor: {
          displayName: "Beheerder Bas",
          email: "admin@example.com",
        },
        afterSnapshot: JSON.stringify(nextValues),
        beforeSnapshot: JSON.stringify(buildInitialFieldValues(GALLERY_SHOWCASE_FIELDS)),
        fieldValues: buildPersistableFieldValues(GALLERY_SHOWCASE_FIELDS, nextValues),
        targetSection: "gallery-showcase",
      },
      client,
    );

    const updatedContent = toLandingPageContent(getStoredContentSnapshot(client));

    expect(updatedContent.galleryShowcase.title).toBe("Nieuwe galerijtitel");
    expect(updatedContent.galleryShowcase.images[0]?.src).toBe("/basijs3.jpg");
    expect(updatedContent.galleryShowcase.images[0]?.alt).toBe("Nieuwe eerste sliderfoto");
  });

  it("normalizes the legacy reviews nav label to sfeerimpressie", () => {
    const client = createContentDatabaseClient(":memory:");

    seedContentStore(buildDefaultPersistableValues(), client);

    const nextValues = {
      ...buildInitialFieldValues(GROUPED_CONTENT_FIELDS),
      "navItems.2.label": "Reviews",
    };

    saveContentMutation(
      {
        actor: {
          displayName: "Beheerder Bas",
          email: "admin@example.com",
        },
        afterSnapshot: JSON.stringify(nextValues),
        beforeSnapshot: JSON.stringify(buildInitialFieldValues(GROUPED_CONTENT_FIELDS)),
        fieldValues: buildPersistableFieldValues(GROUPED_CONTENT_FIELDS, nextValues),
        targetSection: "grouped-content",
      },
      client,
    );

    const updatedContent = toLandingPageContent(getStoredContentSnapshot(client));

    expect(updatedContent.navItems[2]?.label).toBe(defaultSiteContent.navItems[2]?.label);
  });
});
