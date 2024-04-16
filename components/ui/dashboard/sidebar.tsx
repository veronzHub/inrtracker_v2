"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaHome } from "react-icons/fa";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
// import { FaNoteSticky } from "react-icons/fa6";
import { FaDroplet } from "react-icons/fa6";
import { GiWaterDrop } from "react-icons/gi";
import { FaPills } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { Button } from "../button";
import { signOut } from "@/app/actions/auth";
import { MdError } from "react-icons/md";
import { FaPrescriptionBottle } from "react-icons/fa";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [medicationToggle, setMedicationToggle] = useState(
    pathname.includes("/dashboard/warfarin/schedule") ||
      pathname.includes("/dashboard/warfarin/prescription")
  );

  return (
    <aside className="fixed w-14 h-screen flex flex-col bg-slate-50 hide-scrollbar z-50">
      <nav className="py-2 z-10 h-full w-14 hover:w-[14rem] border-r bg-studio border-default transition-width duration-200 flex flex-col overflow-x-hidden justify-between overflow-y-auto bg-slate-50 hide-scrollbar">
        <ul className="flex flex-col gap-y-5 h-full justify-start px-2">
          <li>
            <Link
              href="/"
              className={cn(
                "relative h-10 w-full transition-all duration-200 flex items-center rounded justify-center hover:bg-sky-100 hover:text-sky-600"
              )}
            >
              <span className="absolute text-2xl left-0 top-0 flex rounded h-10 w-10 items-center justify-center">
                <GiWaterDrop className=" text-red-500" />
                <span className="font-bold drop-shadow-sm text-2xl min-w-[128px] absolute left-12 transition-all">
                  <span className="text-sky-700">INR</span>Trac
                  <span className="text-sky-700">k</span>er
                </span>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className={cn(
                "relative h-10 w-full transition-all duration-200 flex items-center rounded justify-center hover:bg-sky-100 hover:text-sky-600",
                {
                  "bg-slate-200 text-sky-800": pathname === "/dashboard",
                }
              )}
            >
              <span className="absolute text-2xl left-0 top-0 flex rounded h-10 w-10 items-center justify-center">
                <FaHome />
              </span>

              <span className="min-w-[128px] absolute left-12 transition-all">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <div
              onClick={() => setMedicationToggle(!medicationToggle)}
              className={cn(
                "relative flex h-10 grow items-center gap-2 rounded-md p-3 font-medium hover:bg-sky-100 hover:text-sky-600 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer",
                {
                  "bg-slate-200 text-sky-800":
                    pathname === "/dashboard/warfarin/schedule" ||
                    pathname === "/dashboard/warfarin/prescription" ||
                    pathname === "/dashboard/warfarin/accidents",
                }
              )}
            >
              <div className="flex items-center gap-2">
                <span className="absolute text-2xl left-0 top-0 flex rounded h-10 w-10 items-center justify-center">
                  <FaPills />
                </span>
                <div className="flex w-[calc(100%-4rem)] absolute left-12 transition-all">
                  <span>Warfarin</span>
                  <span className="ml-auto flex items-center">
                    {medicationToggle ? (
                      <IoMdArrowDropdown />
                    ) : (
                      <IoMdArrowDropleft />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <ul
              className={cn("subNavIcons flex gap-2 flex-col text-bold mt-2", {
                hidden: !medicationToggle,
              })}
            >
              <li>
                <Link
                  href="/dashboard/warfarin/schedule"
                  className={cn(
                    "relative h-10 w-full transition-all duration-200 flex items-center rounded justify-center hover:bg-sky-100 hover:text-sky-600",
                    {
                      "bg-slate-200 text-sky-800":
                        pathname === "/dashboard/warfarin/schedule",
                    }
                  )}
                >
                  <span className="absolute text-md left-0 top-0 flex rounded h-10 w-10 items-center justify-center">
                    <FaCalendarDays />
                  </span>

                  <span className="min-w-[128px] absolute left-12 transition-all">
                    Schedule
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/warfarin/accidents"
                  className={cn(
                    "relative h-10 w-full transition-all duration-200 flex items-center rounded justify-center hover:bg-sky-100 hover:text-sky-600",
                    {
                      "bg-slate-200 text-sky-800":
                        pathname === "/dashboard/warfarin/accidents",
                    }
                  )}
                >
                  <span className="absolute text-md left-0 top-0 flex rounded h-10 w-10 items-center justify-center">
                    <MdError />
                  </span>

                  <span className="min-w-[128px] absolute left-12 transition-all">
                    Accidents
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/warfarin/prescription"
                  className={cn(
                    "relative h-10 w-full transition-all duration-200 flex items-center rounded justify-center hover:bg-sky-100 hover:text-sky-600",
                    {
                      "bg-slate-200 text-sky-800":
                        pathname === "/dashboard/warfarin/prescription",
                    }
                  )}
                >
                  <span className="absolute text-md left-0 top-0 flex rounded h-10 w-10 items-center justify-center">
                    <FaPrescriptionBottle />
                  </span>

                  <span className="min-w-[128px] absolute left-12 transition-all">
                    Prescription
                  </span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href="/dashboard/inr"
              className={cn(
                "relative h-10 w-full transition-all duration-200 flex items-center rounded justify-center hover:bg-sky-100 hover:text-sky-600",
                {
                  "bg-slate-200 text-sky-800": pathname === "/dashboard/inr",
                }
              )}
            >
              <span className="absolute text-2xl left-0 top-0 flex rounded h-10 w-10 items-center justify-center">
                <FaDroplet />
              </span>

              <span className="min-w-[128px] absolute left-12 transition-all">
                INR
              </span>
            </Link>
          </li>

          <li className="mt-auto">
            <form action={signOut}>
              <Button
                variant="secondary"
                className={cn(
                  "relative h-10 w-full transition-all duration-200 flex items-center rounded justify-center hover:bg-sky-100 hover:text-sky-600"
                )}
              >
                <span className="absolute text-2xl left-0 top-0 flex rounded h-10 w-10 items-center justify-center">
                  <TbLogout />
                </span>

                <span className="min-w-[128px] absolute left-12 transition-all">
                  Logout
                </span>
              </Button>
            </form>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
