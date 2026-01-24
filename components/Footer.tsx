"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { MessageCircle, Users, Code2, Play, Globe } from "lucide-react";

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "PLATFORM",
    links: [
      { label: "Home", href: "/" },
      { label: "Events Hub", href: "/events" },
      { label: "Community Portal", href: "/community" },
      { label: "Course Catalog", href: "/courses" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Chapter Directory", href: "/chapters" },
      { label: "Resource Library", href: "/resources" },
      { label: "Documentation", href: "/docs" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "COMMUNITY",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Global Chapters", href: "/chapters" },
      { label: "Become a Mentor", href: "/mentor" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Code of Conduct", href: "/code-of-conduct" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!email.trim()) {
        setError("Please enter your email.");
        return;
      }

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Failed");
      }

      setSuccess(true);
      setEmail("");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-50">
      {/* Soft background overlay (same style as hero) */}
      <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F9FF] via-white to-[#F5F9FF]" />
        <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[#145DA0]/8 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[#EAF2FB] blur-3xl" />
      </div>

      {/* Top block */}
      <Container className="relative py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left brand + short text + icons */}
          <div className="lg:col-span-4">
            <div className="flex items-start gap-3">
              <div>
                <div className="text-xl font-extrabold tracking-tight text-slate-900">
                  Testers Connect
                </div>

                <p className="mt-3 max-w-sm text-[15px] leading-7 text-slate-600">
                  Empowering testing professionals worldwide through community,
                  education, and excellence.
                </p>

                <div className="mt-6 flex items-center gap-6 text-slate-700">
                  <Link
                    href="/community"
                    className="rounded-xl p-2 hover:bg-blue-50 hover:text-blue-700"
                    aria-label="Community"
                  >
                    <Users className="h-6 w-6" />
                  </Link>

                  <Link
                    href="/chapters"
                    className="rounded-xl p-2 hover:bg-blue-50 hover:text-blue-700"
                    aria-label="Chapters"
                  >
                    <MessageCircle className="h-6 w-6" />
                  </Link>

                  <Link
                    href="/docs"
                    className="rounded-xl p-2 hover:bg-blue-50 hover:text-blue-700"
                    aria-label="Documentation"
                  >
                    <Code2 className="h-6 w-6" />
                  </Link>

                  <Link
                    href="/resources"
                    className="rounded-xl p-2 hover:bg-blue-50 hover:text-blue-700"
                    aria-label="Resources"
                  >
                    <Play className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Columns */}
          <div className="lg:col-span-8">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {footerColumns.map((col) => (
                <div key={col.title}>
                  <div className="text-xs font-extrabold tracking-widest text-slate-900">
                    {col.title}
                  </div>

                  <ul className="mt-6 space-y-4">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="text-[15px] text-slate-700 hover:text-blue-700"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Divider */}
      <div className="border-t border-slate-200" />

      {/* Stay connected */}
      <Container className="relative py-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="text-3xl font-extrabold tracking-tight text-slate-900">
              Stay Connected
            </div>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate-600">
              Get the latest updates on courses, events, and community news.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="w-full sm:flex-1">
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              <Button
                type="button"
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full sm:w-auto bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-60"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>

            {success ? (
              <p className="mt-3 text-sm text-green-600">
                You’re subscribed. Check your email 🎉
              </p>
            ) : null}

            {error ? (
              <p className="mt-3 text-sm text-red-600">{error}</p>
            ) : null}
          </div>
        </div>
      </Container>

      {/* Divider */}
      <div className="border-t border-slate-200" />

      {/* Bottom bar */}
      <Container className="relative py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-[15px] text-slate-700">
            <span>© {year} Testers Connect. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>

            <Link
              href="/global"
              className="inline-flex items-center gap-2 hover:text-blue-700"
            >
              <Globe className="h-4 w-4" />
              <span>Global Community</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[15px] text-slate-700">
            <Link href="/accessibility" className="hover:text-blue-700">
              Accessibility
            </Link>
            <span>•</span>
            <Link href="/sitemap" className="hover:text-blue-700">
              Sitemap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
