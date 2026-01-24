"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowRight, X } from "lucide-react";

type EventItem = {
  id?: string;
  title: string;
  slug: string;
  event_date: string;
  mode: "Online" | "In-person";
  city: string | null;
  description: string;
  tags?: string[];
  image?: string | null;
  register_url?: string | null;
};

function snippet(text: string, max = 120) {
  const t = (text || "").trim();
  if (t.length <= max) return t;
  return t.slice(0, max).trimEnd() + "…";
}

type EventCardsModalProps = {
  events: EventItem[];
  limit?: number;
};

export default function EventCardsModal({ events, limit }: EventCardsModalProps) {
  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const items = typeof limit === "number" ? events.slice(0, limit) : events;

  const active = useMemo(
    () => events.find((e) => e.slug === activeSlug) || null,
    [events, activeSlug]
  );

  function openModal(slug: string) {
    setActiveSlug(slug);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setActiveSlug(null);
  }

  if (!events || events.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
        <div className="text-xl font-extrabold text-slate-900">No event to show</div>
        <p className="mt-2 text-slate-600">Please check back soon for new events.</p>
      </div>
    );
  }

  return (
    <>
      {/* Cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((e) => (
          <button
            key={e.slug}
            type="button"
            onClick={() => openModal(e.slug)}
            className="text-left"
          >
            <Card className="h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              {/* Cover */}
              <div className="relative h-44 w-full">
                <Image
                  src={e.image || "/images/events/default.jpg"}
                  alt={e.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Snippet */}
              <div className="p-6">
                <div className="text-lg font-extrabold tracking-tight text-slate-900">
                  {e.title}
                </div>

                <div className="mt-3 space-y-1 text-sm text-slate-700">
                  <div>📅 {e.event_date}</div>
                  <div>📍 {e.city || e.mode}</div>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {snippet(e.description, 110)}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                  View details <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Card>
          </button>
        ))}
      </div>

      {/* Modal */}
      {open && active && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Event details"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top image */}
            <div className="relative h-56 w-full">
              <Image
                src={active.image || "/images/events/default.jpg"}
                alt={active.title}
                fill
                className="object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 hover:bg-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-7">
              <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                {active.title}
              </div>

              <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                <div>📅 {active.event_date}</div>
                <div>📍 {active.city || active.mode}</div>
                <div>🧑‍🤝‍🧑 {active.mode}</div>
                <div>🕒 Time TBA</div>
              </div>

              {active.tags?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {active.tags.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 text-[15px] leading-7 text-slate-700">
                {active.description}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <Button
                  variant="outline"
                  className="rounded-2xl py-6"
                  onClick={closeModal}
                >
                  Close
                </Button>

                {active.register_url ? (
                  <Link href={active.register_url} target="_blank" rel="noreferrer">
                    <Button className="rounded-2xl py-6">
                      Register <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/events/${active.slug}`}>
                    <Button className="rounded-2xl py-6">
                      View & Register <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
