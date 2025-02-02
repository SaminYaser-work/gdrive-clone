CREATE TABLE `files` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`parent` integer NOT NULL,
	`content` text NOT NULL,
	`size` integer NOT NULL,
	`createdAt` integer
);
--> statement-breakpoint
CREATE INDEX `file_parent_idx` ON `files` (`parent`);--> statement-breakpoint
CREATE TABLE `folders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`parent` integer,
	`createdAt` integer
);
--> statement-breakpoint
CREATE INDEX `folder_parent_idx` ON `folders` (`parent`);