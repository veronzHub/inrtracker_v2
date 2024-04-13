import AuthButton from "@/components/AuthButton";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <nav className="w-full flex justify-end h-16 border-b border-b-foreground/10 bg-slate-50">
      <div className="pt-3 pr-10 text-sm">
        <AuthButton />
      </div>
    </nav>
  );
}
