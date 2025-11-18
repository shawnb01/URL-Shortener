"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "~/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/components/ui/dropdown-menu";
import { Checkbox } from "~/app/components/ui/checkbox";
import { DataTableColumnHeader } from "~/app/components/data-table-column-header";
import Link from "next/link";
import type { URLDataObject } from "~/lib/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const userRole = "USER"; // This should be fetched from user session or context
const authorId = "user1"; // This should be fetched from user session or context

export const columns: ColumnDef<URLDataObject>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "clicks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Clicks" />
    ),
    cell: (cell) => {
      const clicks = cell.row.getValue<number>("clicks");
      return clicks ? clicks : 0;
    },
  },
  {
    accessorKey: "authorId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author ID" />
    ),
    cell: ({ row }) => row.getValue("authorId"),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: (cell) => {
      const status = cell.row.getValue<"active" | "inactive" | "deleted">(
        "status",
      );
      return status.charAt(0).toUpperCase() + status.slice(1);
    },
  },
  {
    accessorKey: "urlSlug",
    header: "URL Slug",
    cell: ({ row }) => (
      <Link
        href={"/url/" + row.getValue("urlSlug")}
        target="_blank"
        className="text-muted hover:text-muted-foreground underline"
      >
        {row.getValue("urlSlug")}
      </Link>
    ),
  },
  {
    accessorKey: "targetUrl",
    header: "Target URL",
    cell: ({ row }) => (
      <Link
        href={row.getValue("targetUrl")}
        target="_blank"
        className="text-muted hover:text-muted-foreground underline"
      >
        {row.getValue("targetUrl")}
      </Link>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit URL</DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* @ts-ignore */}
              {userRole == "ADMIN" && (
                <DropdownMenuItem>View URLs by Creator</DropdownMenuItem>
              )}
              {/* @ts-ignore */}
              {authorId == row.getValue("authorId") && (
                <DropdownMenuItem className="text-destructive bg-destructive/10 hover:bg-destructive/20 hover:text-destructive/70">
                  Delete Shortened URL
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
