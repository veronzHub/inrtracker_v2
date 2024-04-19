import DashboardHeader from "@/components/ui/dashboard/header";
import DashboardSidebar from "@/components/ui/dashboard/sidebar";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }
  return (
    <main className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 max-w-full">
        {/* <DashboardHeader /> */}
        <div className="pr-10 py-10 pl-24">{children}</div>
      </div>
    </main>
  );
}
