"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Instagram, Linkedin, Slack, Mail, AtSign } from "lucide-react";

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "PAGES",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    title: "EXPLORE",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Resources", href: "/resources" },
      { label: "Engage", href: "/engage" },
      { label: "Contact", href: "/contact" },
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
                  {/* Email 1 */}
                  <a
                    href="mailto:testerconnect@yahoo.com"
                    className="rounded-xl p-2 hover:bg-blue-50 hover:text-blue-700"
                    aria-label="Email testerconnect@yahoo.com"
                  >
                    <Mail className="h-6 w-6" />
                  </a>

                  {/* Email 2 */}
                  <a
                    href="mailto:connecttesters@gmail.com"
                    className="rounded-xl p-2 hover:bg-blue-50 hover:text-blue-700"
                    aria-label="Email connecttesters@gmail.com"
                  >
                    <AtSign className="h-6 w-6" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/testers_connect?igsh=YTJjYW1tOWZuYTZw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl p-2 hover:bg-blue-50 hover:text-blue-700"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>

                  {/* Slack */}
                  <a
                    href="https://join.slack.com/t/testers-connect/shared_invite/zt-3er2nbb1u-q6vWJbZYZ8OQHytBKEswaw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl p-2 hover:bg-blue-50 hover:text-blue-700"
                    aria-label="Slack"
                  >
                    <Slack className="h-6 w-6" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/testerskonnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl p-2 hover:bg-blue-50 hover:text-blue-700"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Columns */}
          <div className="lg:col-span-8">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
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
              Get the latest updates on webinars, events, and community news.
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
                className="w-full sm:w-auto bg-[#145da0] text-white hover:bg-[#0f4f8a] disabled:opacity-60"
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[15px] text-slate-700">
            © {year} Testers Connect. All rights reserved.
          </span>

          <Link
            href="/contact"
            className="text-[15px] text-slate-700 hover:text-blue-700"
          >
            Contact
          </Link>
        </div>
      </Container>
    </footer>
  );
}