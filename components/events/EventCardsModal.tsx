"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowRight, X } from "lucide-react";

type EventType =
  | "Webinar"
  | "Workshop"
  | "Bootcamp"
  | "Masterclass"
  | "Meetup"
  | "QA Session";

type EventItem = {
  id?: string;
  title: string;
  slug: string;
  event_date: string; // YYYY-MM-DD
  mode: "Online" | "In-person";
  city: string | null;
  description: string;
  tags?: string[];
  cover_image_url?: string | null;
  register_url?: string | null;

  // ✅ NEW
  event_type?: EventType;
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

const FALLBACK_IMG = "/images/default.jpg";

// Link styled like your Button (avoid nesting <button> inside <a>)
function LinkButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
    >
      {children}
    </Link>
  );
}

function isPastEvent(eventDate: string) {
  // Compare by date only (safe for YYYY-MM-DD)
  const today = new Date().toISOString().slice(0, 10);
  return Boolean(eventDate) && eventDate < today;
}

function prettyEventType(t?: EventType) {
  return t || "Workshop";
}

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

  if (!events || events.length === 0) return null;

  const registerUrl = active?.register_url?.trim() || "";
  const past = active ? isPastEvent(active.event_date) : false;

  return (
    <>
      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((e) => {
          const imgSrc = e.cover_image_url || FALLBACK_IMG;
          const typeLabel = prettyEventType(e.event_type);

          return (
            <button
              key={e.slug}
              type="button"
              onClick={() => openModal(e.slug)}
              className="text-left"
            >
              <Card className="h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="relative h-44 w-full">
                  <Image
                    src={imgSrc}
                    alt={e.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* ✅ NEW: type badge */}
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                    {typeLabel}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-lg font-extrabold tracking-tight text-slate-900">
                    {e.title}
                  </div>

                  <div className="mt-3 space-y-1 text-sm text-slate-700">
                    <div>📅 {e.event_date}</div>
                    <div>📍 {e.city || e.mode}</div>

                    {/* ✅ NEW: show type */}
                    <div>🎯 {typeLabel}</div>
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
          );
        })}
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
            <div className="relative h-56 w-full">
              <Image
                src={active.cover_image_url || FALLBACK_IMG}
                alt={active.title}
                fill
                className="object-cover"
              />

              {/* ✅ NEW: type badge */}
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                {prettyEventType(active.event_type)}
              </div>

              <button
                onClick={closeModal}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 hover:bg-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-7">
              <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                {active.title}
              </div>

              <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                <div>📅 {active.event_date}</div>
                <div>📍 {active.city || active.mode}</div>
                <div>🧑‍🤝‍🧑 {active.mode}</div>

                {/* ✅ NEW */}
                <div>🎯 {prettyEventType(active.event_type)}</div>

                <div className="sm:col-span-2">🕒 Time TBA</div>
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

                {registerUrl ? (
                  <LinkButton href={registerUrl} external>
                    {past ? "View" : "Register"}{" "}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </LinkButton>
                ) : (
                  <LinkButton href={`/events/${active.slug}`}>
                    {past ? "View" : "View & Register"}{" "}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </LinkButton>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
