/** @format */

import { useFetcher } from "react-router";
import { Button } from "~/components/ui/button";
import { seedDatabase } from "~/db/queries";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dev" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.VALUE_FROM_NETLIFY };
}

export async function action() {
    const res = await seedDatabase();
    return res;
}

export default function Home() {
    let fetcher = useFetcher();
    let busy = fetcher.state !== "idle";

    return (
        <div className="container mx-auto flex items-center justify-center h-screen">
            <fetcher.Form method="post">
                <Button
                    type="submit"
                    className="py-4 px-2 bg-rose-500 cursor-pointer"
                >
                    {busy ? "Seeding..." : "Seed Database"}
                </Button>
                {fetcher.data === false && (
                    <p className="text-red-600">Error</p>
                )}
            </fetcher.Form>
        </div>
    );
}
