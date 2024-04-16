import {
  getDaysOfWeek,
  getWarfarinDosages,
  getWarfarinPreferences,
} from "@/app/actions/warfarin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import WarfarinScheduleInsertForm from "./insert-form";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import H1 from "@/components/ui/dashboard/h1";
import H2 from "@/components/ui/dashboard/h2";

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
    <>
      <H1>Warfarin Dose Schedule</H1>

      {data !== null && data.length > 0 ? (
        <>
          <div>
            <H2>Add a Dose Schedule</H2>
            <WarfarinScheduleInsertForm
              data={data}
              daysOfWeekData={daysOfWeekData}
            />
          </div>

          <div className="mt-10">
            <H2>Warfarin Schedule History</H2>

            <DataTable columns={columns} data={warfarinDosages} />
          </div>
        </>
      ) : (
        <div className="flex text-center items-center justify-center flex-1 mt-10">
          <div>
            <H2>No Warfarin Prescriptions found</H2>
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
    </>
  );
}
