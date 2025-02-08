/** @format */

import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const filesTable = sqliteTable(
    "files",
    {
        id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
        name: text().notNull(),
        parent: integer().notNull(),
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

export type InsertFile = typeof filesTable.$inferInsert;
export type SelectFile = typeof filesTable.$inferSelect;

export type InsertFolder = typeof foldersTable.$inferInsert;
export type SelectFolder = typeof foldersTable.$inferSelect;

export type Item = {
    id: number;
    name: string;
    type: "file" | "folder";
    parent: number | null;
    size?: number;
    createdAt: Date | null;
};
