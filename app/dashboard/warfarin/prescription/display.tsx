// "use client";
import { cn } from "@/lib/utils";
import DeleteForm from "./delete-form";
import { LuPill } from "react-icons/lu";

type TDisplay = {
  data: {
    id: number;
    pill_strength: number | null;
    warfarin: {
      id: number;
      strength: string | null;
      unit: string | null;
      color: string | null;
      hex: string | null;
    } | null;
  }[];
};
export default function Display({ data }: TDisplay) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Your Warfarin Pills</h2>
      <div
        className={cn(
          "w-full grid gap-4 grid-cols-1",
          data.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
        )}
      >
        {data &&
          data.map((data) => {
            return (
              <div
                key={data.id}
                className="even:bg-gray-50 odd:bg-white rounded-md "
              >
                <div className="relative bg-slate-700 flex items-center justify-center p-8 rounded-md">
                  <span className="absolute right-4 top-4">
                    <DeleteForm
                      id={data.id}
                      pill_strength={data.warfarin && data.warfarin.strength}
                      unit={data.warfarin && data.warfarin.unit}
                    />
                  </span>
                  <LuPill
                    className={`w-40 h-40`}
                    style={{ color: `#${data.warfarin && data.warfarin.hex}` }}
                  />
                  <span className="text-white text-6xl">
                    {data.warfarin && data.warfarin.strength}
                    {data.warfarin && data.warfarin.unit}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
