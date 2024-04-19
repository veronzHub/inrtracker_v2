import { getWarfarin, getWarfarinPreferences } from "@/app/actions/warfarin";

import WarfarinPreferencesInsertForm from "./insert-form";
import Display from "./display";
import H1 from "@/components/ui/dashboard/h1";
import H2 from "@/components/ui/dashboard/h2";

export default async function WarfarinSettings() {
  const data = await getWarfarinPreferences();
  const warfarinData = await getWarfarin();
  return (
    <>
      <H1>Warfarin Prescription</H1>

      <div className="flex gap-10 flex-col lg:flex-row">
        <div className="lg:w-96 w-full">
          <H2>Add Warfarin Pill</H2>
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
              <H2>No Warfarin Pill Details Found</H2>
              <p>Use the form on the left to save your prescribed pill type.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
