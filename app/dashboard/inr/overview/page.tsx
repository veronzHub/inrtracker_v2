import { inrGet } from "@/app/actions/inr";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import InrChart from "./chart";

export default async function InrOverview() {
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
      <h1 className="text-5xl font-bold mb-10 text-sky-700">INR Overview</h1>

      {data !== null && data.length > 0 ? (
        <>
          <InrChart data={data} />

          {/* <Table data={data} /> */}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">No INR's Found</h2>{" "}
          <Link href="/dashboard/inr/manage">Log your first INR</Link>
        </div>
      )}
    </>
  );
}
