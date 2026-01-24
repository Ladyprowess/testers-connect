import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/ui/Card";
import Tag from "@/components/Tag";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { getEvents } from "@/lib/db";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Events"
        title="Events that help you learn and connect"
        desc="Online and in-person sessions. Clear topics. Friendly people."
      />

      <div className="mt-10 grid gap-5">
        {events.map((e) => (
          <Card key={e.id} className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-[240px]">
                <div className="text-lg font-bold">{e.title}</div>
                <div className="mt-1 text-sm text-slate-600">
                  {e.event_date} • {e.mode}
                  {e.city ? ` • ${e.city}` : ""}
                </div>
                <p className="mt-3 text-slate-600">{e.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              </div>

              <Link href={`/events/${e.slug}`}>
                <Button variant="outline">View details</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
