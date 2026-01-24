// app/page.tsx  (or src/app/page.tsx)

import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import StatCard from "@/components/StatCard";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import HeroRotating from "@/components/home/HeroRotating";
import { stats } from "@/content/data";
import {
  Users,
  CalendarDays,
  GraduationCap,
  MapPin,
  ArrowRight,
  BookOpen,
  Wrench,
  MessageSquareText,
  Code,
} from "lucide-react";

type OfferItem = {
  title: string;
  desc: string;
  href: string;
  metric: string;
  Icon: any;
  bg: string;
};

type ResourceTile = {
  title: string;
  desc: string;
  downloads: string;
  href: string;
  Icon: any;
  iconBg: string;
};

export default function HomePage() {
  const offers: OfferItem[] = [
    {
      title: "Events",
      desc: "Online and in-person sessions that help you learn and connect.",
      href: "/events",
      metric: "500+ Events/Year",
      Icon: CalendarDays,
      bg: "bg-[#145DA0]",
    },
    {
      title: "Chapters",
      desc: "Meet testers near you and build your network in a friendly way.",
      href: "/chapters",
      metric: "120+ Countries",
      Icon: MapPin,
      bg: "bg-[#16A34A]",
    },
    {
      title: "Courses",
      desc: "Simple learning paths that build skill step by step.",
      href: "/courses",
      metric: "200+ Courses",
      Icon: GraduationCap,
      bg: "bg-[#F97316]",
    },
    {
      title: "Community",
      desc: "Connect with testers worldwide and grow with support.",
      href: "/community",
      metric: "50K+ Members",
      Icon: Users,
      bg: "bg-[#7C3AED]",
    },
  ];

  // NEW: Resources section (like your screenshot)
  const resourceTiles: ResourceTile[] = [
    {
      title: "PDF Guide",
      desc: "Complete guide from beginner to expert with skill requirements and salary expectations.",
      downloads: "15,420 downloads",
      href: "/resources",
      Icon: BookOpen,
      iconBg: "bg-[#2563EB]",
    },
    {
      title: "Resource Pack",
      desc: "Essential tools, frameworks, and best practices for modern test automation.",
      downloads: "12,350 downloads",
      href: "/resources",
      Icon: Wrench,
      iconBg: "bg-[#7C3AED]",
    },
    {
      title: "Ebook",
      desc: "100+ common testing interview questions with detailed answers and tips.",
      downloads: "18,920 downloads",
      href: "/resources",
      Icon: MessageSquareText,
      iconBg: "bg-[#C2410C]",
    },
    {
      title: "Cheat Sheet",
      desc: "Quick reference for REST API testing with examples and common patterns.",
      downloads: "9,840 downloads",
      href: "/resources",
      Icon: Code,
      iconBg: "bg-[#16A34A]",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <HeroRotating />

      {/* Stats */}
      <section className="bg-slate-50">
        <Container className="py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        </Container>
      </section>

      {/* What you get */}
      <section className="bg-white">
        <Container className="py-16">
          <SectionHeading
            eyebrow="What you get"
            title="Everything you need to grow in testing"
            desc="Events, chapters, courses, and resources built for real progress."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {offers.map((c) => {
              const Icon = c.Icon;

              return (
                <Link
                  key={c.title}
                  href={c.href}
                  className="group rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#145DA0]/30"
                >
                  <Card className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
                    <div
                      className={`grid h-16 w-16 place-items-center rounded-2xl ${c.bg} shadow-lg`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <div className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900">
                      {c.title}
                    </div>

                    <p className="mt-3 text-[17px] leading-7 text-slate-600">
                      {c.desc}
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-900">
                        {c.metric}
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-900 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* REPLACEMENT SECTION (from your screenshot) */}
      <section className="bg-white">
        <Container className="py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Resources
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Download our most popular resources
            </h2>
            <p className="mt-3 text-slate-600">
              Download our most popular resources and start your testing journey today.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {resourceTiles.map((r) => {
              const Icon = r.Icon;
              return (
                <Card
                  key={r.title}
                  className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"
                >
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl shadow-lg">
                    <div className={`grid h-16 w-16 place-items-center rounded-2xl ${r.iconBg}`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <div className="mt-6 text-sm font-extrabold uppercase tracking-wide text-slate-900">
                    {r.title}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {r.desc}
                  </p>

                  <div className="mt-6 text-sm text-slate-500">
                    {r.downloads}
                  </div>

                  <div className="mt-7">
                    <Link href={r.href}>
                      <Button
                        variant="outline"
                        className="w-full rounded-2xl py-6 text-base font-semibold"
                      >
                        Download Free <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* FINAL CTA — full width blue background */}
      <section className="bg-[#145DA0]">
        <Container className="py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready to grow in testing?
              </h3>
              <p className="mt-2 max-w-2xl text-white/90">
                Join Testers Connect and start learning with people who want to build real skill.
              </p>
            </div>

            <Link href="/community">
              <Button
                size="lg"
                className="rounded-2xl bg-white px-7 py-6 text-base font-semibold text-[#145DA0] hover:bg-white/90"
              >
                Join our community
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
