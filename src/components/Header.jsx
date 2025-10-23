"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./ui/mode-toggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/60 supports-[backdrop-filter]:bg-background/30">
      <div className="absolute inset-0 border-b border-border/40" />
      <div className="container relative flex h-16 items-center p-4">
        <nav className="flex flex-1 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 transition-all duration-300"
          >
            Shashank
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center ">
            {!isMenuOpen && (
              <div className="md:hidden px-2 py-1.5">
                <ModeToggle />
              </div>
            )}
            {isMenuOpen ? (
              <X
                size={24}
                className="hover:bg-accent transition-colors rounded-md"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            ) : (
              <Menu
                size={24}
                className="hover:bg-accent transition-colors rounded-md"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/projects"
              className="text-sm font-medium transition-all duration-200 hover:text-primary relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-all duration-200 hover:text-primary relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium transition-all duration-200 hover:text-primary relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <div className="pl-2 border-l border-border/40">
              <ModeToggle />
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          <div className="md:hidden border-t border-border/40 backdrop-blur-xl bg-background/60 h-screen">
            <div className="container py-4 flex flex-col gap-4">
              {[
                ["Projects", "/projects"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium px-2 py-1.5 transition-all duration-200 hover:bg-accent hover:text-accent-foreground border-b"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
