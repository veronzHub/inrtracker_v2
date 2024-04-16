import Header from "@/components/ui/home/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImDroplet } from "react-icons/im";
import Image from "next/image";
import { useState } from "react";
import Features from "@/components/ui/home/features";
import Faq from "@/components/ui/home/faq";

export default async function Index() {
  return (
    <main>
      <Header />

      <section className="flex min-h-[calc(100vh-100px)] items-center justify-center container g-x-10 mx-auto pt-15 pb-15">
        <div className="pl-10 pr-20">
          <h1 className="text-7xl font-semibold mb-8 animate-fade-down">
            <span className="block mb-3 ">INR Tracking</span>
            <span className="text-sky-500 ">Made Simple</span>
          </h1>
          <p className="text-2xl mb-8 animate-fade-down">
            Record your INR, drug dosages, and more with our platform tailored
            specifically for Warfarin users. Take the hassle out of tracking and
            start focusing on your health today.
          </p>
          <p className="animate-fade-down">
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="default"
                className="text-2xl pt-10 pb-10"
              >
                Sign up now
              </Button>
            </Link>
          </p>
        </div>
        <div className="hidden sm:block">
          <ImDroplet className="h-60 w-60 xl:h-96 xl:w-96 text-col text-red-500 animate-fade-left" />
        </div>
      </section>
      <section className="pt-32 pb-8 text-white bg-gradient-to-r from-sky-700 to-sky-300">
        <div className="container ">
          <h2 className=" text-5xl text-center ">
            Everything you need to manage your INR
          </h2>
          <Features />
        </div>
      </section>

      <Faq />
      <footer className="p-10 text-center bg-slate-700 text-white text-xs">
        &copy; {new Date().getFullYear()} INRTracker. All Rights Reserved.{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy.
        </Link>{" "}
        <Link href="/terms" className="underline">
          Terms of Service
        </Link>
      </footer>
    </main>
  );
}
