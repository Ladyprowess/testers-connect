// app/page.tsx  (or src/app/page.tsx)

import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import StatCard from "@/components/StatCard";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Tag from "@/components/Tag";
import { stats, events, chapters, courses, resources } from "@/content/data";
import HeroRotating from "@/components/home/HeroRotating";
import {
  Users,
  CalendarDays,
  GraduationCap,
  MapPin,
  ArrowRight,
} from "lucide-react";

type OfferItem = {
  title: string;
  desc: string;
  href: string;
  metric: string;
  Icon: any;
  bg: string;
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

      {/* What we offer - updated structure */}
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
                    {/* Icon */}
                    <div
                      className={`grid h-16 w-16 place-items-center rounded-2xl ${c.bg} shadow-lg`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Title */}
                    <div className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900">
                      {c.title}
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-[17px] leading-7 text-slate-600">
                      {c.desc}
                    </p>

                    {/* Bottom row */}
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

      {/* Featured content */}
      <section className="bg-slate-50">
        <Container className="py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Events"
                title="Upcoming events"
                desc="Pick one and join. We keep things clear and practical."
              />
              <div className="mt-8 space-y-4">
                {events.map((e) => (
                  <Card key={e.slug} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">{e.title}</div>
                        <div className="mt-1 text-sm text-slate-600">
                          {e.date} • {e.mode}
                          {e.city ? ` • ${e.city}` : ""}
                        </div>
                        <p className="mt-3 text-sm text-slate-600">
                          {e.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {e.tags.map((t) => (
                            <Tag key={t} label={t} />
                          ))}
                        </div>
                      </div>
                      <Link href={`/events/${e.slug}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Resources"
                title="Learn with simple guides"
                desc="Templates and guides that help you move faster."
              />
              <div className="mt-8 grid gap-4">
                {resources.map((r) => (
                  <Card key={r.title} className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold">{r.title}</div>
                        <div className="mt-1 text-sm text-slate-600">
                          {r.type} • {r.desc}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {r.tags.map((t) => (
                            <Tag key={t} label={t} />
                          ))}
                        </div>
                      </div>
                      <Button variant="secondary" size="sm" type="button">
                        Open
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/resources">
                  <Button variant="outline">See all resources</Button>
                </Link>
                <Link href="/courses">
                  <Button>View courses</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Chapters + Courses preview */}
      <section className="bg-white">
        <Container className="py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Chapters"
                title="Find your people"
                desc="Join a local chapter or a global online chapter."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {chapters.slice(0, 4).map((ch) => (
                  <Card key={ch.name} className="p-5">
                    <div className="font-semibold">{ch.name}</div>
                    <div className="mt-1 text-sm text-slate-600">
                      {ch.country} • {ch.frequency}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {ch.tags.map((t) => (
                        <Tag key={t} label={t} />
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/chapters">
                  <Button variant="outline">See all chapters</Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Courses"
                title="Learn with clear steps"
                desc="Short courses built to help you practise and improve."
              />
              <div className="mt-8 grid gap-4">
                {courses.map((c) => (
                  <Card key={c.title} className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">{c.title}</div>
                        <div className="mt-1 text-sm text-slate-600">
                          {c.level} • {c.duration}
                        </div>
                        <p className="mt-3 text-sm text-slate-600">{c.desc}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {c.tags.map((t) => (
                            <Tag key={t} label={t} />
                          ))}
                        </div>
                      </div>
                      <Button variant="secondary" size="sm" type="button">
                        View
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/courses">
                  <Button>Go to courses</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-50">
        <Container className="py-16">
          <div className="rounded-xl2 border border-brand-100 bg-white p-8 sm:p-10">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to grow in testing?
            </h3>
            <p className="mt-3 max-w-2xl text-slate-600">
              Join Testers Connect and start learning with people who want to
              build real skill.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/community">
                <Button size="lg">Join our community</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
