"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/survey", label: "Check-in" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-200/30 bg-cyan-300/10 text-cyan-100">
            <HeartPulse className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate text-lg font-semibold">Himmat</span>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition hover:text-cyan-100",
                pathname === link.href ? "text-cyan-200" : "text-slate-400"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200"
        >
          <Activity className="h-4 w-4" aria-hidden="true" />
          Analyze
        </Link>
      </div>
    </nav>
  );
}
