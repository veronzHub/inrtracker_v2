import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export default async function Warfarin() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }
  return (
    <div>
      <h1 className="text-5xl font-bold mb-10 text-sky-700">Medication</h1>
    </div>
  );
}
