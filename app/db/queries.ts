/** @format */

import { faker } from "@faker-js/faker";
import { eq, isNull } from "drizzle-orm";
import { db } from ".";
import { filesTable, foldersTable, type Item } from "./schema";

export async function getItemsByFolderId(folderId: number | null) {
    const items = [] as Item[];

    const filesPromise = db
        .select()
        .from(filesTable)
        .where(
            folderId !== null
                ? eq(filesTable.parent, folderId)
                : isNull(filesTable.parent)
        );

    const foldersPromise = db
        .select()
        .from(foldersTable)
        .where(
            folderId !== null
                ? eq(foldersTable.parent, folderId)
                : isNull(foldersTable.parent)
        );

    await Promise.all([filesPromise, foldersPromise]).then(
        ([files, folders]) => {
            folders.forEach((folder) =>
                items.push({ ...folder, type: "folder" })
            );
            files.forEach((file) => items.push({ ...file, type: "file" }));
        }
    );

    return items;
}

export async function getBreadcrumbItems(folderId: number) {
    const folders = [];

    let currentFolder = (
        await db
            .select()
            .from(foldersTable)
            .where(eq(foldersTable.id, folderId))
            .limit(1)
    )[0];

    while (currentFolder) {
        folders.unshift(currentFolder);

        if (currentFolder.parent === null) {
            break;
        }

        const parentFolder = (
            await db
                .select()
                .from(foldersTable)
                .where(eq(foldersTable.id, currentFolder.parent))
                .limit(1)
        )[0];

        if (parentFolder) {
            currentFolder = parentFolder;
        } else {
            break;
        }
    }

    return folders;
}

async function insertFakeFolders(count: number): Promise<number[]> {
    const folderIds: number[] = [];

    for (let i = 0; i < count; i++) {
        const folder = {
            name: i === 0 ? "/" : faker.word.noun(),
            parent: i > 0 ? faker.helpers.arrayElement(folderIds) : null,
            createdAt: faker.date.recent(),
        };
        const result = await db
            .insert(foldersTable)
            .values(folder)
            .returning({ id: foldersTable.id });

        if (result[0]) {
            folderIds.push(result[0].id);
        }
    }

    console.log(`${count} fake folders added.`);
    return folderIds;
}

async function insertFilesForFolders(folderIds: number[]) {
    for (const folderId of folderIds) {
        const fileCount = faker.number.int({ min: 0, max: 5 });

        for (let i = 0; i < fileCount; i++) {
            const file = {
                name: faker.system.fileName(),
                parent: folderId,
                size: faker.number.int({ min: 1024, max: 1048576 }), // File size between 1KB and 1MB
                createdAt: faker.date.recent(),
            };
            await db.insert(filesTable).values(file);
        }

        console.log(`Added ${fileCount} files to folder ID: ${folderId}`);
    }
}

// Main function to seed the database
export async function seedDatabase() {
    try {
        const folderIds = await insertFakeFolders(10);
        await insertFilesForFolders(folderIds);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
