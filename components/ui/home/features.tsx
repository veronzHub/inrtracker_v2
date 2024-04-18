"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  const toggleFeature = (index: number) => {
    setActiveFeature(index);
  };
  return (
    <div className=" to-sky-300 pt-20 pb-32">
      <section className="flex w-full flex-col md:flex-row ">
        <div className="lg:w-[500px] w-full flex items-center justify-center">
          <ul className=" text-white text-md">
            <li
              onClick={() => toggleFeature(0)}
              className={cn(
                " rounded-tl-md rounded-bl-md bg-opacity-30 py-7 px-14  text-slate-200 cursor-pointer",
                {
                  "bg-slate-700 bg-opacity-30": activeFeature === 0,
                }
              )}
            >
              <h2 className="font-bold text-xl">Treatment Snapshot</h2>
              <p>See a snapshot of your INR Journey</p>
            </li>
            <li
              onClick={() => toggleFeature(1)}
              className={cn(
                " rounded-tl-md rounded-bl-md bg-opacity-30 py-7 px-14  text-slate-200 cursor-pointer",
                {
                  "bg-slate-700 ": activeFeature === 1,
                }
              )}
            >
              <h2 className="font-bold text-xl">Warfarin Dose Schedules</h2>
              <p>Keep track of your dosages as they change</p>
            </li>
            <li
              onClick={() => toggleFeature(2)}
              className={cn(
                " rounded-tl-md rounded-bl-md bg-opacity-30 py-7 px-14  text-slate-200 cursor-pointer",
                {
                  "bg-slate-700 ": activeFeature === 2,
                }
              )}
            >
              <h2 className="font-bold text-xl">INR</h2>
              <p>Log your INR's and see trends</p>
            </li>
            <li
              onClick={() => toggleFeature(3)}
              className={cn(
                " rounded-tl-md rounded-bl-md bg-opacity-30 py-7 px-14  text-slate-200 cursor-pointer",
                {
                  "bg-slate-700 ": activeFeature === 3,
                }
              )}
            >
              <h2 className="font-bold text-xl">Accidents</h2>
              <p>
                If you took an extra dose, or missed one entirely, you can keep
                track of it here
              </p>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          {activeFeature === 0 && (
            <Image
              src="/dashboard-ss.png"
              alt="Dashboard"
              width={1000}
              height={650}
              className="shadow-2xl"
              priority={true}
            />
          )}
          {activeFeature === 1 && (
            <Image
              src="/schedule-ss.png"
              alt="Schedule"
              width={1000}
              height={650}
              className="shadow-2xl"
              priority={true}
            />
          )}
          {activeFeature === 2 && (
            <Image
              src="/inr-ss.png"
              alt="INR"
              width={1000}
              height={650}
              className="shadow-2xl"
              priority={true}
            />
          )}
          {activeFeature === 3 && (
            <Image
              src="/accidents-ss.png"
              alt="Accidents"
              width={1000}
              height={650}
              className="shadow-2xl"
              priority={true}
            />
          )}
        </div>
      </section>
    </div>
  );
}
