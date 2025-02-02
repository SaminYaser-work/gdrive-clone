/** @format */

import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const filesTable = sqliteTable(
    "files",
    {
        id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
        name: text().notNull(),
        url: text().notNull(),
        parent: integer().notNull(),
        content: text("content").notNull(),
        size: integer("size").notNull(),
        createdAt: integer({ mode: "timestamp_ms" }),
    },
    (t) => {
        return [index("file_parent_idx").on(t.parent)];
    }
);

export const foldersTable = sqliteTable(
    "folders",
    {
        id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
        name: text().notNull(),
        parent: integer({ mode: "number" }),
        createdAt: integer({ mode: "timestamp_ms" }),
    },
    (t) => {
        return [index("folder_parent_idx").on(t.parent)];
    }
);

export type InsertUser = typeof filesTable.$inferInsert;
export type SelectUser = typeof filesTable.$inferSelect;

export type InsertPost = typeof foldersTable.$inferInsert;
export type SelectPost = typeof foldersTable.$inferSelect;
