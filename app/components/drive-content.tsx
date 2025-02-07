/** @format */

import { FileIcon, FolderIcon, MoreVertical } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { Item } from "~/lib/data";

interface DriveContentProps {
    items: Item[];
    onNavigate: (id: string) => void;
}

export function DriveContent({ items, onNavigate }: DriveContentProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                        <div className="space-y-1 flex-1">
                            <CardTitle className="line-clamp-1 text-base">
                                <button
                                    onClick={() => {
                                        if (item.type === "folder") {
                                            onNavigate(item.id);
                                        }
                                    }}
                                    className="hover:underline cursor-pointer"
                                >
                                    {item.type === "folder" ? (
                                        <FolderIcon className="mr-2 h-4 w-4 inline-block" />
                                    ) : (
                                        <FileIcon className="mr-2 h-4 w-4 inline-block" />
                                    )}
                                    {item.name}
                                </button>
                            </CardTitle>
                            <CardDescription>
                                {item.size ? `${item.size} • ` : ""}
                                {item.modified}
                            </CardDescription>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="bg-slate-900"
                            >
                                <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer">
                                    Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer">
                                    Move
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer">
                                    Download
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="dark:bg-amber-50" />
                                <DropdownMenuItem className="text-red-500 hover:bg-red-500 hover:text-slate-50 cursor-pointer">
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
