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
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { Item } from "~/lib/data";
import { getItemsByParentId } from "~/lib/data";

interface DriveSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    currentFolder: string | null;
    onNavigate: (id: string) => void;
}

export function DriveSidebar({
    currentFolder,
    onNavigate,
    className,
    ...props
}: DriveSidebarProps) {
    const rootItems = getItemsByParentId(null);

    return (
        <div className={cn("flex flex-col gap-4", className)} {...props}>
            <div className="grid gap-1">
                <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => onNavigate("root")}
                >
                    <StarIcon className="mr-2 h-4 w-4" />
                    Starred
                </Button>
                <Button variant="ghost" className="justify-start">
                    <Trash2Icon className="mr-2 h-4 w-4" />
                    Trash
                </Button>
            </div>
            <div className="grid gap-1 mt-4">
                <h3 className="px-4 text-sm font-medium">Folders</h3>
                <ScrollArea className="h-[300px] px-1">
                    <div className="grid gap-1">
                        {rootItems.map((item) => (
                            <SidebarItem
                                key={item.id}
                                item={item}
                                isActive={item.id === currentFolder}
                                onNavigate={onNavigate}
                                currentFolder={currentFolder}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}

interface SidebarItemProps {
    item: Item;
    isActive?: boolean;
    currentFolder: string | null;
    onNavigate: (id: string) => void;
}

function SidebarItem({
    item,
    isActive,
    onNavigate,
    currentFolder,
}: SidebarItemProps) {
    const children = getItemsByParentId(item.id);
    const hasChildren = children.length > 0;
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div>
            <Button
                variant="ghost"
                className={cn(
                    "w-full justify-start cursor-pointer",
                    isActive && "bg-slate-700"
                )}
                onClick={() => onNavigate(item.id)}
            >
                {hasChildren && (
                    <button
                        onClick={() => setCollapsed((prev) => !prev)}
                        className="mr-2 h-4 w-4 cursor-pointer"
                    >
                        {!collapsed ? (
                            <ChevronRight className="mr-2 h-4 w-4" />
                        ) : (
                            <ChevronDown className="mr-2 h-4 w-4" />
                        )}
                    </button>
                )}
                {item.type === "folder" ? (
                    <FolderIcon className="mr-2 h-4 w-4" />
                ) : (
                    <FileIcon className="mr-2 h-4 w-4" />
                )}
                {item.name}
            </Button>
            {collapsed && hasChildren && (
                <div className="ml-6 grid gap-1">
                    {children.map((child) => (
                        <SidebarItem
                            key={child.id}
                            item={child}
                            isActive={child.id === currentFolder}
                            currentFolder={currentFolder}
                            onNavigate={onNavigate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
