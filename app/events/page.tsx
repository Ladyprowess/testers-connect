export const dynamic = "force-dynamic";

import Container from "@/components/Container";
import { getEventsPaged } from "@/lib/db";
import EventCardsModal from "@/components/events/EventCardsModal";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";

export default async function EventsPage({
  searchParams,
}: {
  searchParams?: Promise<{ view?: string; page?: string }>;
}) {
  const sp = (await searchParams) ?? {};

  const view = sp.view === "past" ? "past" : "upcoming";
  const page = Math.max(1, Number(sp.page || 1) || 1);
  const PAGE_SIZE = 6;

  const { items, totalPages, totalCount } = await getEventsPaged({
    view,
    page,
    pageSize: PAGE_SIZE,
  });

  const activeClass =
    "border-slate-900 bg-white text-slate-900"; // ✅ black border only when active
  const inactiveClass =
    "border-slate-200 bg-white text-slate-700 hover:border-slate-300";

  return (
    <section className="bg-white">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-9">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Events
              </div>

              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
                {view === "past" ? "Past Events" : "Upcoming Events"}
              </h1>

              <p className="mt-3 text-lg text-slate-600">
                Join conferences, workshops, and meetups around the world.
              </p>

              {/* ✅ MOBILE BROWSE (directly under join text) */}
              <div className="mt-6 grid gap-3 lg:hidden">
                <Link
                  href="/events?view=upcoming&page=1"
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    view === "upcoming" ? activeClass : inactiveClass
                  }`}
                >
                  Upcoming events
                </Link>

                <Link
                  href="/events?view=past&page=1"
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    view === "past" ? activeClass : inactiveClass
                  }`}
                >
                  Past events
                </Link>
              </div>
            </div>

            {/* ✅ EVENTS (no shrinking empty state) */}
            <div className="mt-10">
              <EventCardsModal events={items} />
            </div>

            {/* ✅ Pagination only when > 6 */}
            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  makeHref={(p) => `/events?view=${view}&page=${p}`}
                />
              </div>
            )}

            {/* ✅ One empty message only (full width) */}
            {totalCount === 0 && (
              <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
                <div className="text-xl font-bold text-slate-900">
                  No events yet.
                </div>
                <div className="mt-2 text-slate-600">
                  Please check back soon for new events.
                </div>
              </div>
            )}
          </div>

          {/* ✅ DESKTOP BROWSE ONLY (no recent past events list) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="lg:sticky lg:top-24 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm font-bold text-slate-900">Browse</div>

              <div className="mt-4 grid gap-3">
                <Link
                  href="/events?view=upcoming&page=1"
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    view === "upcoming" ? activeClass : inactiveClass
                  }`}
                >
                  Upcoming events
                </Link>

                <Link
                  href="/events?view=past&page=1"
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    view === "past" ? activeClass : inactiveClass
                  }`}
                >
                  Past events
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
