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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type URL = {
  id: string;
  authorId: string;
  clicks: number;
  status: "active" | "inactive" | "deleted";
  urlSlug: string;
  targetUrl: string;
  createdAt: number;
  updatedAt: number;
};

export const columns: ColumnDef<URL>[] = [
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
    cell: ({ row }) => row.getValue("clicks"),
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
    cell: ({ row }) => row.getValue("status"),
  },
  {
    accessorKey: "urlSlug",
    header: "URL Slug",
    cell: ({ row }) => row.getValue("urlSlug"),
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
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(row.getValue("id"))
                }
              >
                Copy Payment Id
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Customer</DropdownMenuItem>
              <DropdownMenuItem>View Payment Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
