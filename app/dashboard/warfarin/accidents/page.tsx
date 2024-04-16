import { getMissedWarfarinDosages } from "@/app/actions/warfarin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import InsertAccidentForm from "./insert-form";
import H1 from "@/components/ui/dashboard/h1";
import H2 from "@/components/ui/dashboard/h2";

export default async function WarfarinAccidents() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const missedWarfarinDosages = await getMissedWarfarinDosages();

  return (
    <div>
      <H1>Warfarin Accidents</H1>

      <div className="flex gap-10 flex-col xl:flex-row">
        <div className="xl:w-96 w-full">
          <H2>Missed or Incorrect Dosages</H2>

          <InsertAccidentForm />
        </div>

        {missedWarfarinDosages !== null && missedWarfarinDosages.length > 0 ? (
          <div className="flex-grow">
            <H2>Accident History</H2>
            <DataTable columns={columns} data={missedWarfarinDosages} />
          </div>
        ) : (
          <div className="flex text-center items-center justify-center flex-1">
            <div>
              <H2>No Accidents Found</H2>
              <p>
                Use the form on the left to log a missed or incorrect dosage.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
