"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Home,
  Info,
  Users,
  MoreHorizontal,
  ChevronDown,
  Menu,
  X,
  CalendarDays,
  GraduationCap,
  BookOpen,
  MapPin,
  Book,
  Megaphone,
  Mail,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type MoreItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!moreRef.current) return;
      if (!moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () =>
      document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) setMoreOpen(false);
  }, [mobileOpen]);

  /* About replaces Events */
  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
      { label: "About", href: "/about", icon: <Info className="h-5 w-5" /> },
      {
        label: "Events",
        href: "/events",
        icon: <CalendarDays className="h-5 w-5" />,
      },
      {
        label: "Community",
        href: "/community",
        icon: <Users className="h-5 w-5" />,
      },
      {
        label: "Blog",
        href: "https://blog.testersconnect.com",
        icon: <Book className="h-5 w-5" />,
      },
    ],
    []
  );

  /* Webinars moved into More + icons added */
  const moreItems: MoreItem[] = useMemo(
    () => [
      
      {
        label: "Webinars",
        href: "/webinars",
        icon: <GraduationCap className="h-5 w-5" />,
      },
      {
        label: "Resources",
        href: "/resources",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        label: "Engage",
        href: "/engage",
        icon: <Megaphone className="h-5 w-5" />,
      },
      {
        label: "Contact",
        href: "/contact",
        icon: <Mail className="h-5 w-5" />,
      },
    ],
    []
  );

  const mobileItems = [...navItems, ...moreItems];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo only */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.png"
            alt="Testers Connect"
            width={90}
            height={40}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-xl px-2 py-1 text-[15px] font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-700"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl px-2 py-1 text-[15px] font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-700"
            >
              <MoreHorizontal className="h-5 w-5" />
              <span>More</span>
              <ChevronDown
                className={`h-4 w-4 transition ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {moreOpen && (
              <div className="absolute left-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white shadow-lg">
                <div className="p-2">
                  {moreItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/about"
            className="hidden rounded-2xl bg-[#145da0] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#0f4f8a] md:inline-flex"
          >
            Get Started
          </Link>

          <button
            className="md:hidden rounded-xl border border-slate-200 bg-white p-2"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="grid gap-1">
              {mobileItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex justify-center rounded-2xl bg-[#145da0] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0f4f8a]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
