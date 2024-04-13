import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import INRInsertForm from "./records/insert-form";
import InrResults from "./results";

export default async function Inr() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  return (
    <div>
      <h1 className="text-5xl font-bold mb-10 text-sky-700">INR</h1>

      <div className="flex gap-10 flex-col xl:flex-row">
        <div className="xl:w-96 w-full">
          <h2 className="text-2xl font-bold mb-3">Add New INR</h2>
          <INRInsertForm />
        </div>

        <div className="flex-grow md:shrink-0">{/* <InrResults /> */}</div>
      </div>
    </div>
  );
}
