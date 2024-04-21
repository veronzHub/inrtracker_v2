"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import DeleteForm from "./delete-form";
import UpdateInrForm from "./update-form";
import { TInrForm } from "@/types/inr";

export const columns: ColumnDef<TInrForm>[] = [
  {
    accessorKey: "delete",
    header: "",
    size: 10,
    cell: ({ row }) => {
      const thisone = row.original;

      return (
        <DeleteForm
          id={thisone.id}
          date={thisone.date}
          inr={thisone.inr}
          note={thisone.note}
        />
      );
    },
  },
  {
    accessorKey: "edit",
    header: "",
    size: 10,
    cell: ({ row }) => {
      const thisone = row.original;

      return (
        <UpdateInrForm
          id={thisone.id}
          date={thisone.date}
          inr={thisone.inr}
          note={thisone.note}
        />
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "inr",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          INR
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "note",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Note
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
