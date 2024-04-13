"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import DeleteForm from "./delete-form";
import UpdateForm from "./update-form";

type TCols = {
  id: number;
  missed: boolean;
  incorrect: boolean;
  date: string | null;
  note: string | null;
};

export const columns: ColumnDef<TCols>[] = [
  {
    accessorKey: "delete",
    header: "",
    size: 10,
    cell: ({ row }) => {
      const thisone = row.original;

      return (
        <DeleteForm id={thisone.id} date={thisone.date} note={thisone.note} />
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
        <UpdateForm
          id={thisone.id}
          date={thisone.date}
          note={thisone.note}
          missed={thisone.missed}
          incorrect={thisone.incorrect}
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
    accessorKey: "missed",
    cell: ({ row }) => {
      const thisone = row.original;

      return <>{thisone.missed ? "Missed" : ""}</>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Missed
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "incorrect",
    cell: ({ row }) => {
      const thisone = row.original;

      return <>{thisone.incorrect ? "Incorrect" : ""}</>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Incorrect
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
