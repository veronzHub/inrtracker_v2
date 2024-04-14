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
    accessorKey: "type",
    cell: ({ row }) => {
      const thisone = row.original;

      return (
        <>
          {thisone.missed ? "Missed" : ""}
          {thisone.incorrect ? "Incorrect" : ""}
        </>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const typeValue = (row) => {
        if (row.missed && row.incorrect) return 0;
        if (row.missed) return 1;
        if (row.incorrect) return 2;
        return 3;
      };
      return typeValue(rowA.original) - typeValue(rowB.original);
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
