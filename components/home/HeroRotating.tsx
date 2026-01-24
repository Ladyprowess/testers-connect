"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  ArrowRight,
  GraduationCap,
  Rocket,
  Users,
  Globe,
  CalendarDays,
  HeartHandshake,
} from "lucide-react";

type Slide = {
  key: string;
  badge: string;
  title: string;
  desc: string;
  ctaLabel: string;
  href: string;
  Icon: any;
  accent: "blue" | "purple" | "orange";
};

function accentStyles(accent: Slide["accent"]) {
  if (accent === "blue") {
    return {
      pillBg: "bg-[#145DA0]",
      iconBg: "from-[#145DA0] to-[#145DA0]",
      faint: "text-[#145DA0]",
    };
  }
  if (accent === "purple") {
    return {
      pillBg: "bg-purple-600",
      iconBg: "from-purple-600 to-purple-500",
      faint: "text-purple-700",
    };
  }
  return {
    pillBg: "bg-orange-600",
    iconBg: "from-orange-600 to-orange-500",
    faint: "text-orange-700",
  };
}

export default function HeroRotating() {
  const slides: Slide[] = useMemo(
    () => [
      {
        key: "start",
        badge: "START YOUR JOURNEY",
        title: "Where expertise meets opportunity.",
        desc: "Join thousands of aspiring testers learning the fundamentals and building successful careers.",
        ctaLabel: "Explore free resources",
        href: "/resources",
        Icon: GraduationCap,
        accent: "blue",
      },
      {
        key: "advance",
        badge: "ADVANCE YOUR EXPERTISE",
        title: "Grow your skills with clear learning paths.",
        desc: "Connect with industry leaders, practise advanced techniques, and build confidence in real testing work.",
        ctaLabel: "Browse advanced webinars",
        href: "/Webinard",
        Icon: Rocket,
        accent: "purple",
      },
      {
        key: "lead",
        badge: "ORGANISE & INSPIRE",
        title: "Build community and lead with impact.",
        desc: "Start a local chapter, speak at events, and mentor the next generation of testing professionals.",
        ctaLabel: "Become a leader",
        href: "/community",
        Icon: Users,
        accent: "orange",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((v) => (v + 1) % slides.length);
    }, 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  const s = slides[active];
  const styles = accentStyles(s.accent);

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      {/* Soft background overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[#145DA0]/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full bg-slate-100 blur-3xl" />
      </div>

      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* LEFT */}
          <div className="lg:col-span-7">
            <p className="text-[42px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[54px]">
              Empowering Testers,{" "}
              <span className="text-[#145DA0]">One Connection at a Time</span>
            </p>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600">
              We are a non-profit, community-driven hub for Quality Assurance
              professionals. Built on inclusivity and accessibility, we provide
              free learning resources, mentorship and visibility opportunities
              for testers worldwide.
            </p>

            {/* CTA ROW */}
           {/* CTA ROW */}
<div className="mt-7">
  <div className="grid gap-3 sm:flex sm:items-center">
    <Link href="/community" className="block w-full sm:w-auto">
      <Button
        size="lg"
        className="w-full justify-center bg-[#145DA0] text-white hover:bg-[#145DA0]/90 sm:w-auto"
      >
        Join our community
      </Button>
    </Link>

    <Link href="/donate" className="block w-full sm:w-auto">
      <Button
        size="lg"
        variant="outline"
        className="w-full justify-center border-slate-300 text-slate-900 hover:bg-slate-50 sm:w-auto"
      >
        <span className="inline-flex items-center gap-2 text-base font-medium">
          Donate <HeartHandshake className="h-5 w-5" />
        </span>
      </Button>
    </Link>
  </div>
</div>


            {/* Stats row - equal layout */}
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Card 1 */}
              <div className="flex h-[92px] items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50">
                  <Users className="h-5 w-5 text-[#145DA0]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-900">
                    Active Members
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Growing weekly
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex h-[92px] items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50">
                  <Globe className="h-5 w-5 text-[#145DA0]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-900">
                    Countries
                  </div>
                  <div className="mt-1 text-sm text-slate-600">Worldwide</div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex h-[92px] items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50">
                  <CalendarDays className="h-5 w-5 text-[#145DA0]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-900">
                    Events Yearly
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Online + local
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <Card className="p-8 sm:p-9">
              <div className="flex items-start gap-4">
                <div
                  className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-b ${styles.iconBg} shadow-md`}
                >
                  <s.Icon className="h-7 w-7 text-white" />
                </div>

                <div className="flex-1">
                  <div className="text-xs font-extrabold tracking-widest text-slate-900">
                    {s.badge}
                  </div>

                  <p className="mt-4 text-[15px] leading-7 text-slate-600">
                    {s.desc}
                  </p>

                  <div className="mt-6">
                    <Link
                      href={s.href}
                      className="inline-flex items-center gap-3 text-base font-semibold text-slate-900 hover:text-[#145DA0]"
                    >
                      {s.ctaLabel}
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* dots */}
              <div className="mt-8 flex gap-2">
                {slides.map((x, idx) => {
                  const on = idx === active;
                  return (
                    <button
                      key={x.key}
                      type="button"
                      onClick={() => setActive(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        on ? `w-8 ${styles.pillBg}` : "w-2.5 bg-slate-200"
                      }`}
                      aria-label={`Show ${x.badge}`}
                    />
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
