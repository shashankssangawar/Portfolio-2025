"use client";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center gap-8 px-4 sm:px-6 lg:px-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <BackgroundRippleEffect />

      <div className="flex flex-col items-center gap-8 text-center relative z-20">
        {/* Decorative line */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 animate-gradient dark:shadow-2xl">
              Hi, I&apos;m Shashank Sangawar
            </span>
          </h1>
          <p className="leading-normal text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl shadow-2xl">
            Software Developer & DevOps Engineer
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/contact">
            <Button className={'shadow-lg shadow-primary/20'}>Get in Touch</Button>
          </Link>
          <Link href="/projects">
            <Button className={'shadow-lg shadow-primary/20'} variant={"outline"}>View Projects</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
