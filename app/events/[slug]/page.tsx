import Container from "@/components/Container";
import Card from "@/components/ui/Card";
import Tag from "@/components/Tag";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/db";

export default async function EventDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEventBySlug(params.slug);
  if (!event) return notFound();

  return (
    <Container className="py-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
          <p className="mt-2 text-slate-600">
            {event.event_date} • {event.mode}
            {event.city ? ` • ${event.city}` : ""}
          </p>
        </div>
        <Link href="/events">
          <Button variant="outline">Back to events</Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card className="p-6">
            <div className="text-sm font-semibold">About this event</div>
            <p className="mt-3 text-slate-600">{event.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {event.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="p-6">
            <div className="text-sm font-semibold">Register</div>
            <p className="mt-2 text-sm text-slate-600">
              This is UI only. You can connect a real registration later.
            </p>
            <div className="mt-5 space-y-3">
              <Button className="w-full">Register now</Button>
              <Button className="w-full" variant="outline">
                Add to calendar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
