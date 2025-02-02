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
            <div className="grid gap-1">
                <h3 className="px-4 text-sm font-medium">Folders</h3>
                <ScrollArea className="h-[300px] px-1">
                    <div className="grid gap-1">
                        {rootItems.map((item) => (
                            <SidebarItem
                                key={item.id}
                                item={item}
                                isActive={item.id === currentFolder}
                                onNavigate={onNavigate}
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
    onNavigate: (id: string) => void;
}

function SidebarItem({ item, isActive, onNavigate }: SidebarItemProps) {
    const children = getItemsByParentId(item.id);
    const hasChildren = children.length > 0;

    return (
        <div>
            <Button
                variant="ghost"
                className={cn("w-full justify-start", isActive && "bg-muted")}
                onClick={() => onNavigate(item.id)}
            >
                {hasChildren ? (
                    <ChevronRight className="mr-2 h-4 w-4" />
                ) : (
                    <ChevronDown className="mr-2 h-4 w-4 opacity-0" />
                )}
                {item.type === "folder" ? (
                    <FolderIcon className="mr-2 h-4 w-4" />
                ) : (
                    <FileIcon className="mr-2 h-4 w-4" />
                )}
                {item.name}
            </Button>
            {hasChildren && (
                <div className="ml-6 grid gap-1">
                    {children.map((child) => (
                        <SidebarItem
                            key={child.id}
                            item={child}
                            isActive={child.id === isActive}
                            onNavigate={onNavigate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
