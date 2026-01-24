import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/ui/Card";
import Tag from "@/components/Tag";
import Button from "@/components/ui/Button";
import { getResources } from "@/lib/db";

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Resources"
        title="Guides and templates"
        desc="Short, practical resources that help you do better work."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {resources.map((r) => (
          <Card key={r.id} className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-bold">{r.title}</div>
                <div className="mt-1 text-sm text-slate-600">{r.type}</div>
                <p className="mt-3 text-slate-600">{r.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>

                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
                  >
                    Open link
                  </a>
                ) : null}
              </div>

              <Button variant="outline" type="button">
                Open
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
