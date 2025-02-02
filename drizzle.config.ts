/** @format */

import { type Config } from "drizzle-kit";

export default {
    schema: "./app/db/schema.ts",
    dialect: "turso",
    out: "./migrations",
    breakpoints: true,
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH!,
    },
} satisfies Config;
