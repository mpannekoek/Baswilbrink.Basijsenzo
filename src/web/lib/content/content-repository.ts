import { sql } from "drizzle-orm";

import { getContentDatabaseClient, type ContentDatabaseClient } from "@/lib/db/client";
import { contentAuditEntries, contentEntries, repeatedContentEntries } from "@/lib/db/schema";

import type { PersistableContentValue } from "./content-keys";

export interface StoredContentSnapshot {
  entries: typeof contentEntries.$inferSelect[];
  repeatedEntries: typeof repeatedContentEntries.$inferSelect[];
}

export interface ContentMutationActor {
  displayName: string;
  email: string;
}

export interface SaveContentMutationInput {
  actor: ContentMutationActor;
  beforeSnapshot: string;
  afterSnapshot: string;
  fieldValues: PersistableContentValue[];
  targetSection: string;
}

function getClient(client?: ContentDatabaseClient): ContentDatabaseClient {
  return client ?? getContentDatabaseClient();
}

function isSinglePersistableValue(
  fieldValue: PersistableContentValue,
): fieldValue is PersistableContentValue & { storage: { key: string; kind: "single" } } {
  return fieldValue.storage.kind === "single";
}

function isRepeatedPersistableValue(
  fieldValue: PersistableContentValue,
): fieldValue is PersistableContentValue & {
  storage: { collection: string; itemKey: string; kind: "repeat"; position: number };
} {
  return fieldValue.storage.kind === "repeat";
}

export function getStoredContentSnapshot(client?: ContentDatabaseClient): StoredContentSnapshot {
  const activeClient = getClient(client);

  return {
    entries: activeClient.db.select().from(contentEntries).all(),
    repeatedEntries: activeClient.db.select().from(repeatedContentEntries).all(),
  };
}

export function getStoredContentCounts(client?: ContentDatabaseClient): {
  repeatedCount: number;
  singleCount: number;
} {
  const snapshot = getStoredContentSnapshot(client);

  return {
    repeatedCount: snapshot.repeatedEntries.length,
    singleCount: snapshot.entries.length,
  };
}

export function seedContentStore(
  fieldValues: PersistableContentValue[],
  client?: ContentDatabaseClient,
): { seeded: boolean } {
  const activeClient = getClient(client);
  const counts = getStoredContentCounts(activeClient);

  if (counts.singleCount > 0 || counts.repeatedCount > 0) {
    return { seeded: false };
  }

  const singleValues = fieldValues.filter(isSinglePersistableValue);
  const repeatedValues = fieldValues.filter(isRepeatedPersistableValue);
  const timestamp = new Date().toISOString();

  activeClient.db.transaction((tx) => {
    if (singleValues.length > 0) {
      tx.insert(contentEntries)
        .values(
          singleValues.map((fieldValue) => ({
            key: fieldValue.storage.key,
            section: fieldValue.section,
            updatedAt: timestamp,
            value: fieldValue.value,
          })),
        )
        .run();
    }

    if (repeatedValues.length > 0) {
      tx.insert(repeatedContentEntries)
        .values(
          repeatedValues.map((fieldValue) => ({
            collection: fieldValue.storage.collection,
            itemKey: fieldValue.storage.itemKey,
            position: fieldValue.storage.position,
            updatedAt: timestamp,
            value: fieldValue.value,
          })),
        )
        .run();
    }
  });

  return { seeded: true };
}

export function saveContentMutation(
  input: SaveContentMutationInput,
  client?: ContentDatabaseClient,
): void {
  const activeClient = getClient(client);
  const singleValues = input.fieldValues.filter(isSinglePersistableValue);
  const repeatedValues = input.fieldValues.filter(isRepeatedPersistableValue);
  const timestamp = new Date().toISOString();

  activeClient.db.transaction((tx) => {
    if (singleValues.length > 0) {
      tx.insert(contentEntries)
        .values(
          singleValues.map((fieldValue) => ({
            key: fieldValue.storage.key,
            section: fieldValue.section,
            updatedAt: timestamp,
            value: fieldValue.value,
          })),
        )
        .onConflictDoUpdate({
          set: {
            section: sql`excluded.section`,
            updatedAt: sql`excluded.updated_at`,
            value: sql`excluded.value`,
          },
          target: contentEntries.key,
        })
        .run();
    }

    if (repeatedValues.length > 0) {
      tx.insert(repeatedContentEntries)
        .values(
          repeatedValues.map((fieldValue) => ({
            collection: fieldValue.storage.collection,
            itemKey: fieldValue.storage.itemKey,
            position: fieldValue.storage.position,
            updatedAt: timestamp,
            value: fieldValue.value,
          })),
        )
        .onConflictDoUpdate({
          set: {
            position: sql`excluded.position`,
            updatedAt: sql`excluded.updated_at`,
            value: sql`excluded.value`,
          },
          target: [repeatedContentEntries.collection, repeatedContentEntries.itemKey],
        })
        .run();
    }

    tx.insert(contentAuditEntries)
      .values({
        actorDisplayName: input.actor.displayName,
        actorIdentifier: input.actor.email,
        afterSnapshot: input.afterSnapshot,
        beforeSnapshot: input.beforeSnapshot,
        createdAt: timestamp,
        targetSection: input.targetSection,
      })
      .run();
  });
}
