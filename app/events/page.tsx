import Container from "@/components/Container";
import { getEvents } from "@/lib/db";
import EventCardsModal from "@/components/events/EventCardsModal";

export default async function EventsPage() {
  const events = await getEvents(); // latest first (DESC in db)

  return (
    <section className="bg-white">
      <Container className="py-16">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Events
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
            Upcoming Events
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Join conferences, workshops, and meetups around the world.
          </p>
        </div>

        {/* ✅ Modal cards + empty state handled inside */}
        <div className="mt-10">
          <EventCardsModal events={events} />
        </div>
      </Container>
    </section>
  );
}
