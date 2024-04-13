import { inrGet } from "@/app/actions/inr";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import INRInsertForm from "./insert-form";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default async function InrManage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const data = await inrGet();

  return (
    <>
      <h1 className="text-5xl font-bold mb-10 text-sky-700">INR Records</h1>

      <div className="flex gap-10 flex-col xl:flex-row">
        <div className="xl:w-96 w-full">
          <h2 className="text-2xl font-bold mb-3">Add New INR</h2>
          <INRInsertForm />
        </div>

        {data !== null && data.length > 0 ? (
          <div className="flex-grow md:shrink-0">
            <h2 className="text-2xl font-bold mb-3">INR History</h2>
            <DataTable columns={columns} data={data} />
            {/* <Table data={data} /> */}
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
    </>
  );
}
