import { cn } from "@/lib/utils";
import Link from "next/link";
import { GiWaterDrop } from "react-icons/gi";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "font-bold drop-shadow-sm text-2xl flex items-center justify-middle",
        className
      )}
    >
      <GiWaterDrop className="h-5 w-5 text-red-500" />
      <span className="text-sky-700">INR</span>Trac
      <span className="text-sky-700">k</span>er
    </Link>
  );
}
