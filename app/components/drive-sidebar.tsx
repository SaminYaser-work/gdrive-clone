/** @format */

import {
    ChevronDown,
    ChevronRight,
    FileIcon,
    FolderIcon,
    StarIcon,
    Trash2Icon,
} from "lucide-react";
import { cn } from "~/lib/utils";

import type React from "react"; // Added import for React
import { useState } from "react";
import { Link, NavLink, useFetcher, useParams } from "react-router";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { Item } from "~/db/schema";

interface DriveSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    items: Item[];
}

export function DriveSidebar({ items, className, ...props }: DriveSidebarProps) {
    return (
        <div className={cn("flex flex-col gap-4", className)} {...props}>
            <div className="grid gap-1">
                <Link className="justify-start" to={`/f/1`}>
                    <StarIcon className="mr-2 h-4 w-4" />
                    Starred
                </Link>
                <Button variant="ghost" className="justify-start">
                    <Trash2Icon className="mr-2 h-4 w-4" />
                    Trash
                </Button>
            </div>
            <div className="grid gap-1 mt-4">
                <h3 className="px-4 text-sm font-medium">Folders</h3>
                <ScrollArea className="h-[300px] px-1">
                    <div className="grid gap-1">
                        {items.map((item) => (
                            <SidebarItem key={item.id} item={item} />
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}

interface SidebarItemProps {
    item: Item;
}

function SidebarItem({ item }: SidebarItemProps) {
    const { folderId } = useParams();
    // const children = getItemsByParentId(item.id);
    // const hasChildren = children.length > 0;
    const hasChildren = true;
    const [collapsed, setCollapsed] = useState(false);
    const isActive = folderId ? item.id === parseInt(folderId) : false;
    const fetcher = useFetcher();

    return (
        <>
            <div
                className={cn(
                    "w-full justify-start cursor-pointer flex gap-2 items-center",
                    isActive && "bg-slate-700"
                )}
            >
                {hasChildren && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!collapsed) {
                                fetcher.submit({ folderId: item.id });
                            }
                            setCollapsed((prev) => !prev);
                        }}
                        className="mr-2 h-4 w-4 cursor-pointer"
                    >
                        {!collapsed ? (
                            <ChevronRight className="mr-2 h-4 w-4" />
                        ) : (
                            <ChevronDown className="mr-2 h-4 w-4" />
                        )}
                    </button>
                )}
                <NavLink to={`/f/${item.id}`} className="flex items-center">
                    {item.type === "folder" ? (
                        <FolderIcon className="mr-2 h-4 w-4" />
                    ) : (
                        <FileIcon className="mr-2 h-4 w-4" />
                    )}
                    {item.name}
                </NavLink>
            </div>
            {collapsed && hasChildren && (
                <div className="ml-6 grid gap-1">
                    TODO
                    {/* {children.map((child) => (
                        <SidebarItem
                            key={child.id}
                            item={child}
                            isActive={child.id === currentFolder}
                        />
                    ))} */}
                </div>
            )}
        </>
    );
}
