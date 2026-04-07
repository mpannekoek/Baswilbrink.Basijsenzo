CREATE TABLE `content_audit_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`actor_identifier` text NOT NULL,
	`actor_display_name` text NOT NULL,
	`target_section` text NOT NULL,
	`before_snapshot` text NOT NULL,
	`after_snapshot` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `content_entries` (
	`key` text PRIMARY KEY NOT NULL,
	`section` text NOT NULL,
	`value` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `repeated_content_entries` (
	`collection` text NOT NULL,
	`item_key` text NOT NULL,
	`position` integer NOT NULL,
	`value` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`collection`, `item_key`)
);
--> statement-breakpoint
CREATE INDEX `repeated_content_entries_collection_position_idx` ON `repeated_content_entries` (`collection`,`position`);