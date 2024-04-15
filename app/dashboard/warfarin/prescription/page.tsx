import { getWarfarin, getWarfarinPreferences } from "@/app/actions/warfarin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import WarfarinPreferencesInsertForm from "./insert-form";
import Display from "./display";

export default async function WarfarinSettings() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const data = await getWarfarinPreferences();
  const warfarinData = await getWarfarin();
  return (
    <>
      <h1 className="text-5xl font-bold mb-10 text-sky-700">
        Warfarin Prescription
      </h1>

      <div className="flex gap-10 flex-col lg:flex-row">
        <div className="lg:w-96 w-full">
          <h2 className="text-2xl font-bold mb-3">Add Warfarin Pill</h2>
          <WarfarinPreferencesInsertForm
            warfarinData={warfarinData}
            getWarfarinPreferencesData={data}
          />
        </div>

        {data !== null && data.length > 0 ? (
          <div>
            <Display data={data} />
          </div>
        ) : (
          <div className="flex text-center items-center justify-center flex-1">
            <div>
              <h2 className="text-xl font-bold mb-2">
                No Warfarin Pill Details Found
              </h2>
              <p>Use the form on the left to save your prescribed pill type.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
