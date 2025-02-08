/** @format */

import { getBreadcrumbItems, getItemsByFolderId } from "~/db/queries";
import type { Route } from "./+types/home";

import { ChevronDown, Menu, Search } from "lucide-react";

import { Link } from "react-router";
import { DriveContent } from "~/components/drive-content";
import { DriveSidebar } from "~/components/drive-sidebar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "ByteDrive" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const folderId = params.folderId ? parseInt(params.folderId) : 1;
    const breadcrumbs = await getBreadcrumbItems(folderId);
    const items = await getItemsByFolderId(folderId);
    return { breadcrumbs, items };
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const folderId = parseInt((formData.get("folderId") as string) ?? "1") ?? 1;
    console.log(folderId);
    const items = await getItemsByFolderId(folderId);
    return {
        items,
    };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const { breadcrumbs, items } = loaderData;

    return (
        <div className="flex h-screen flex-col">
            <header className="flex h-16 items-center border-b px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72">
                        <SheetHeader>
                            <SheetTitle>My Drive</SheetTitle>
                        </SheetHeader>
                        <DriveSidebar items={items} className="mt-4" />
                    </SheetContent>
                </Sheet>
                <div className="flex w-full max-w-3xl items-center gap-2">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search in Drive"
                        className="h-9 bg-muted/50"
                    />
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button>New</Button>
                </div>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <DriveSidebar
                    items={items}
                    className="hidden w-72 border-r p-4 md:block"
                />
                <main className="flex-1 overflow-y-auto">
                    <div className="space-y-4 p-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {breadcrumbs.map((folder, index) => {
                                const isLast = index === breadcrumbs.length - 1;
                                const content =
                                    index === 0 ? (
                                        <span>My Drive</span>
                                    ) : (
                                        folder.name
                                    );

                                return (
                                    <div
                                        key={folder.id}
                                        className="flex items-center gap-2"
                                    >
                                        {isLast ? (
                                            <span className="font-bold">
                                                {content}
                                            </span>
                                        ) : (
                                            <Link
                                                to={`/f/${folder.id}`}
                                                className="hover:underline cursor-pointer"
                                            >
                                                {content}
                                            </Link>
                                        )}
                                        {!isLast && <span>/</span>}
                                    </div>
                                );
                            })}
                        </div>
                        <Separator />
                        <DriveContent items={items} />
                    </div>
                </main>
            </div>
        </div>
    );
}
