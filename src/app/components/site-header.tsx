"use client";
import { SidebarIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="h-6 md:hidden" />
        {/* Add Site Page title/location (pull from navigation state or context) */}
        <div className="text-lg font-semibold">URL Shortener Dashboard</div>
      </div>
    </header>
  );
}
