"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import DeleteForm from "./delete-form";
import { FullPill, HalfPill } from "../../pills";
import { numberToWord } from "@/lib/utils";

type TCols = {
  id: number;
  start_date: string;
  sunday: [];
  monday: [];
  tuesday: [];
  wednesday: [];
  thursday: [];
  friday: [];
  saturday: [];
};

type TRowItems = {
  rowItems: {
    dose: number;
    hex: string;
    strength: number;
  }[];
};

export const columns: ColumnDef<TCols>[] = [
  {
    accessorKey: "delete",
    header: "",
    size: 10,
    cell: ({ row }) => {
      const thisone = row.original;

      return <DeleteForm id={thisone.id} startDate={thisone.start_date} />;
    },
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "sunday",
    cell: ({ row }) => {
      const rowItems = row.original.sunday;
      return <DisplayRows rowItems={rowItems} />;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sunday
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "monday",
    cell: ({ row }) => {
      const rowItems = row.original.monday;
      return <DisplayRows rowItems={rowItems} />;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Monday
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "tuesday",
    cell: ({ row }) => {
      const rowItems = row.original.tuesday;
      return <DisplayRows rowItems={rowItems} />;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tuesday
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "wednesday",
    cell: ({ row }) => {
      const rowItems = row.original.wednesday;
      return <DisplayRows rowItems={rowItems} />;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Wednesday
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "thursday",
    cell: ({ row }) => {
      const rowItems = row.original.thursday;
      return <DisplayRows rowItems={rowItems} />;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thursday
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "friday",
    cell: ({ row }) => {
      const rowItems = row.original.friday;
      return <DisplayRows rowItems={rowItems} />;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Friday
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "saturday",
    cell: ({ row }) => {
      const rowItems = row.original.saturday;
      return <DisplayRows rowItems={rowItems} />;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Saturday
          <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

function DisplayRows({ rowItems }: TRowItems) {
  const renderPills = (dose: number, hex: string) => {
    const pills = [];
    const fullPillCount = Math.floor(dose);
    const halfPillCount = dose % 1 === 0.5 ? 1 : 0;

    for (let i = 0; i < fullPillCount; i++) {
      pills.push(<FullPill key={`full-${i}`} color={hex} />);
    }

    for (let i = 0; i < halfPillCount; i++) {
      pills.push(<HalfPill key={`half-${i}`} color={hex} />);
    }

    return pills;
  };
  return (
    <ul>
      {rowItems.every((item) => item.dose === 0) ? (
        <>
          <li>skip</li>
          <li className="text-slate-500 mt-3 text-xs">Total: 0mg</li>
        </>
      ) : (
        <>
          {rowItems.map((item, index) => (
            <li key={index}>
              {item.dose > 0 && (
                <>
                  <p className="flex flex-wrap mt-2">
                    {renderPills(item.dose, item.hex)}
                  </p>
                  <p>
                    <span>
                      {numberToWord(item.dose)} ({item.strength}mg){" "}
                      {item.dose <= 1 ? "pill" : "pills"}
                    </span>
                  </p>
                </>
              )}
            </li>
          ))}
          <li className="text-slate-500 mt-3 text-xs">
            Total:{" "}
            {rowItems
              .filter((item) => item.dose > 0)
              .reduce(
                (total, item) => total + item.dose * item.strength,
                0
              )}{" "}
            mg
          </li>
        </>
      )}
    </ul>
  );
}
