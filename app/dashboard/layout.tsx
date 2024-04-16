import DashboardHeader from "@/components/ui/dashboard/header";
import DashboardSidebar from "@/components/ui/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
