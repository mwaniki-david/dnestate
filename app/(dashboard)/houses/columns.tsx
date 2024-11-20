"use client";
import { InferRequestType } from "hono";
import { client } from "@/lib/hono";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Actions } from "./actions";

export type ResponseType = InferRequestType<typeof client.api.houses.$get>;

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "houseName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          houseName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "buildingName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BuildingName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  
  {
    accessorKey: "unitType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          unitType
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id}/>
  }
];


// houseName: true,
//   buildingName: true,
//   phoneNo: true,
//   rentalAmount: true,
//   unitType: true,
