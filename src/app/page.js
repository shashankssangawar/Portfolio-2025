"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container relative min-h-screen flex flex-col items-center justify-center gap-8 px-4 sm:px-6 lg:px-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 -translate-x-1/2 bg-purple-500 opacity-20 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 translate-x-1/2 bg-blue-500 opacity-20 blur-[100px]" />
      </div>

      <div className="flex flex-col items-center gap-8 text-center relative">
        {/* Decorative line */}

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 to-red-500 animate-gradient">
              Hi, I&apos;m Shashank Sangawar
            </span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl">
            A Full-Stack Developer and App Developer.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/contact">
            <Button>Get in Touch</Button>
          </Link>
          <Link href="/projects">
            <Button variant={"outline"}>View Projects</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
