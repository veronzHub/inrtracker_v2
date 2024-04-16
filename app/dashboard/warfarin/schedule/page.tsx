import {
  getDaysOfWeek,
  getWarfarinDosages,
  getWarfarinPreferences,
  getWarfarinSchedules,
} from "@/app/actions/warfarin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import WarfarinScheduleInsertForm2 from "./insert-form2";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";

export default async function WarfarinSchedule() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const data = await getWarfarinPreferences();

  const daysOfWeekData = await getDaysOfWeek();

  const warfarinDosages = await getWarfarinDosages();

  return (
    <div>
      <h1 className="text-5xl font-bold mb-10 text-sky-700">
        Warfarin Dose Schedule
      </h1>
      <div>
        {data !== null && data.length > 0 ? (
          <>
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-3">Add a Dose Schedule</h2>
              <WarfarinScheduleInsertForm2
                data={data}
                daysOfWeekData={daysOfWeekData}
              />
            </div>
            {/* {!warfarinDosages && ( */}
            <div className="flex-grow md:shrink-0">
              <h2 className="text-2xl font-bold mb-3 mt-10">
                Warfarin Schedule History
              </h2>
              <DataTable columns={columns} data={warfarinDosages} />
            </div>
            {/* )} */}
          </>
        ) : (
          <div className="flex text-center items-center justify-center flex-1 mt-10">
            <div>
              <h2 className="text-xl font-bold mb-2">
                No Warfarin Prescriptions found
              </h2>
              <p>
                You must first input your{" "}
                <Link
                  href="/dashboard/warfarin/prescription"
                  className="text-emerald-500 font-bold"
                >
                  Warfarin prescription
                </Link>{" "}
                to create a schedule.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
