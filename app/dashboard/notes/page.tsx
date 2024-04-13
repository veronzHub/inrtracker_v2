import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const { data, error } = await supabase.from("notes").select();
  console.log(data);

  return (
    <div>
      <h1 className="text-5xl font-bold mb-10 text-sky-700">Notes</h1>
      {data?.map((note) => {
        return <p key={note.id}>{note.title}</p>;
      })}
    </div>
  );
}
