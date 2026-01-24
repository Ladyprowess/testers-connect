import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/ui/Card";
import Tag from "@/components/Tag";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { getWebinars } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function WebinarsPage() {
  const webinars = await getWebinars();

  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Webinars"
        title="Practical business webinars"
        desc="Live and recorded sessions to help you learn and apply."
      />

      {!webinars.length ? (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
          Webinars are not available yet. Please check back soon.
        </div>
      ) : (
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {webinars.map((w) => (
            <Card key={w.id} className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-bold">{w.title}</div>
                  <div className="mt-1 text-sm text-slate-600">
                    {w.level} • {w.duration}
                  </div>
                  <p className="mt-3 text-slate-600">{w.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <Tag key={t} label={t} />
                    ))}
                  </div>
                </div>

                <Link href={`/webinars/${w.slug}`}>
                  <Button variant="secondary" type="button">
                    View
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
