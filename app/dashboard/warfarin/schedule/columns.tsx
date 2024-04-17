"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import DeleteForm from "./delete-form";

type TCols = {
  id: number;
  start_date: string | null;
  sunday: string | null;
  monday: string | null;
  tuesday: string | null;
  wednesday: string | null;
  thursday: string | null;
  friday: string | null;
  saturday: string | null;
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
  //   {
  //     accessorKey: "Weekly Total",
  //     cell: ({ row }) => {
  //       const rowItems = row.original;

  //       const flattenedData = Object.values(rowItems).flatMap((day) => day);

  //       console.log(flattenedData); // Check the flattened data

  //       const totalMg = flattenedData.reduce((total = 0, item) => {
  //         const dose = parseFloat(item.dose);
  //         const strength = parseFloat(item.strength);
  //         console.log("Dose:", dose, "Strength:", strength); // Check the parsed values
  //         console.log("Total so far:", total); // Check the current total
  //         const product = dose * strength;
  //         console.log("Product:", product); // Check the product of dose and strength
  //         return total + product;
  //       }, 0);

  //       console.log("Total mg:", totalMg);
  //       console.log(rowItems);
  //       return <></>;
  //     },
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Weekly Total
  //           <HiMiniChevronUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       );
  //     },
  //   },
];

function FullPill({ color }) {
  return (
    <span
      className="inline-block bg-blue-500 rounded-full h-4 w-8 rotate-45 mb-4"
      style={{ backgroundColor: `#${color}` }}
    ></span>
  );
}

function HalfPill({ color }) {
  return (
    <span
      className="inline-block bg-blue-500 rounded-r-full h-4 w-5 rotate-45 mb-4 ml-1"
      style={{ backgroundColor: `#${color}` }}
    ></span>
  );
}

const numberToWord = (num: number) => {
  const words = {
    0.5: "Half",
    1: "One",
    1.5: "One and a half",
    2: "Two",
    2.5: "Two and a half",
    3: "Three",
    3.5: "Three and a half",
    4: "Four",
    4.5: "Four and a half",
    5: "Five",
    5.5: "Five and a half",
    6: "Six",
    6.5: "Six and a half",
    7: "Seven",
    7.5: "Seven and a half",
    8: "Eight",
    8.5: "Eight and a half",
    9: "Nine",
    9.5: "Nine and a half",
  };

  return words[num] || num;
};

function DisplayRows({ rowItems }) {
  const renderPills = (item) => {
    const pills = [];
    const fullPillCount = Math.floor(item.dose);
    const halfPillCount = item.dose % 1 === 0.5 ? 1 : 0;

    for (let i = 0; i < fullPillCount; i++) {
      pills.push(<FullPill key={`full-${i}`} color={item.hex} />);
    }

    for (let i = 0; i < halfPillCount; i++) {
      pills.push(<HalfPill key={`half-${i}`} color={item.hex} />);
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
                  <p className="flex flex-wrap mt-2">{renderPills(item)}</p>
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
