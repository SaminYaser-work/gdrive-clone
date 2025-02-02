/** @format */

import { ChevronDown, Menu, Search } from "lucide-react";
import { useState } from "react";

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
import {
    getBreadcrumbItems,
    getItemById,
    getItemsByParentId,
} from "~/lib/data";
import { DriveContent } from "./components/drive-content";
import { DriveSidebar } from "./components/drive-sidebar";

export default function DrivePage() {
    const [currentFolder, setCurrentFolder] = useState<string | null>("root");
    const items = getItemsByParentId(currentFolder);
    const breadcrumbs = getBreadcrumbItems(currentFolder);
    const currentItem = currentFolder ? getItemById(currentFolder) : null;

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
                        <DriveSidebar
                            currentFolder={currentFolder}
                            onNavigate={setCurrentFolder}
                            className="mt-4"
                        />
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
                    currentFolder={currentFolder}
                    onNavigate={setCurrentFolder}
                    className="hidden w-72 border-r p-4 md:block"
                />
                <main className="flex-1 overflow-y-auto">
                    <div className="space-y-4 p-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {breadcrumbs.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-2"
                                >
                                    {index > 0 && <span>/</span>}
                                    <button
                                        onClick={() =>
                                            setCurrentFolder(item.id)
                                        }
                                        className="hover:text-foreground"
                                    >
                                        {item.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Separator />
                        <DriveContent
                            items={items}
                            onNavigate={setCurrentFolder}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
