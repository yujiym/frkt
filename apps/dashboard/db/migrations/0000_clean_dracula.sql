CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`address` text,
	`githubProfileId` text,
	`googleProfileId` text,
	`email` text,
	`username` text,
	`bio` text,
	`iconUrl` text,
	`createdAt` integer NOT NULL
);
