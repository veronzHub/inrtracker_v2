import { getMissedWarfarinDosages } from "@/app/actions/warfarin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import InsertAccidentForm from "./insert-form";

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
      <h1 className="text-5xl font-bold mb-10 text-sky-700">
        Warfarin Accidents
      </h1>
      <div className="flex gap-10 flex-col xl:flex-row">
        <div className="xl:w-96 w-full">
          <h2 className="text-2xl font-bold mb-3">
            Missed or Incorrect Dosages
          </h2>
          <InsertAccidentForm />
        </div>

        {missedWarfarinDosages !== null && missedWarfarinDosages.length > 0 ? (
          <div className="flex-grow md:shrink-0">
            <h2 className="text-2xl font-bold mb-3">Accident History</h2>
            <DataTable columns={columns} data={missedWarfarinDosages} />
          </div>
        ) : (
          <div className="flex text-center items-center justify-center flex-1">
            <div>
              <h2 className="text-xl font-bold mb-2">No Accidents Found</h2>{" "}
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
