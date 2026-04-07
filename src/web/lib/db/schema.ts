import { sql } from "drizzle-orm";
import { index, integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

type BetterSqliteDatabase = import("better-sqlite3").Database;

export const CONTENT_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS content_entries (
  key TEXT PRIMARY KEY NOT NULL,
  section TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS repeated_content_entries (
  collection TEXT NOT NULL,
  item_key TEXT NOT NULL,
  position INTEGER NOT NULL,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (collection, item_key)
);

CREATE INDEX IF NOT EXISTS repeated_content_entries_collection_position_idx
  ON repeated_content_entries (collection, position);

CREATE TABLE IF NOT EXISTS content_audit_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  actor_identifier TEXT NOT NULL,
  actor_display_name TEXT NOT NULL,
  target_section TEXT NOT NULL,
  before_snapshot TEXT NOT NULL,
  after_snapshot TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

export function applyContentSchema(database: BetterSqliteDatabase): void {
  database.exec(CONTENT_SCHEMA_SQL);
}

export const contentEntries = sqliteTable("content_entries", {
  key: text("key").primaryKey(),
  section: text("section").notNull(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const repeatedContentEntries = sqliteTable(
  "repeated_content_entries",
  {
    collection: text("collection").notNull(),
    itemKey: text("item_key").notNull(),
    position: integer("position").notNull(),
    value: text("value").notNull(),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    collectionPositionIndex: index("repeated_content_entries_collection_position_idx").on(
      table.collection,
      table.position,
    ),
    pk: primaryKey({ columns: [table.collection, table.itemKey] }),
  }),
);

export const contentAuditEntries = sqliteTable("content_audit_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  actorIdentifier: text("actor_identifier").notNull(),
  actorDisplayName: text("actor_display_name").notNull(),
  targetSection: text("target_section").notNull(),
  beforeSnapshot: text("before_snapshot").notNull(),
  afterSnapshot: text("after_snapshot").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type ContentEntryRecord = typeof contentEntries.$inferSelect;
export type NewContentEntryRecord = typeof contentEntries.$inferInsert;
export type RepeatedContentEntryRecord = typeof repeatedContentEntries.$inferSelect;
export type NewRepeatedContentEntryRecord = typeof repeatedContentEntries.$inferInsert;
export type ContentAuditEntryRecord = typeof contentAuditEntries.$inferSelect;
export type NewContentAuditEntryRecord = typeof contentAuditEntries.$inferInsert;
