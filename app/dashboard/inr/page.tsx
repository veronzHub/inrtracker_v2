import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import INRInsertForm from "./insert-form";
import { inrGet } from "@/app/actions/inr";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import InrChart from "./chart";

export default async function Inr() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }
  const data = await inrGet();

  return (
    <div>
      <h1 className="text-5xl font-bold mb-10 text-sky-700">INR</h1>

      <div className="flex gap-10 flex-col xl:flex-row">
        <div className="xl:w-96 w-full">
          <h2 className="text-2xl font-bold mb-3">Add New INR</h2>
          <INRInsertForm />
        </div>

        <div className="flex-grow md:shrink-0">
          {data !== null && data.length > 0 ? (
            <div className="flex-grow md:shrink-0">
              <h2 className="text-2xl font-bold mb-3">Trends</h2>
              <InrChart data={data} />
              <h2 className="text-2xl font-bold mb-3">INR History</h2>
              <DataTable columns={columns} data={data} />
            </div>
          ) : (
            <div className="flex text-center items-center justify-center flex-1">
              <div>
                <h2 className="text-xl font-bold mb-2">No INR's Found</h2>{" "}
                <p>Use the form on the left to log your first INR.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
