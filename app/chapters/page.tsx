import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/ui/Card";
import Tag from "@/components/Tag";
import Button from "@/components/ui/Button";

import { chapters } from "@/content/data";

export default function ChaptersPage() {
  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Chapters"
        title="Meet testers near you"
        desc="Join a chapter, attend meetups, and build real connections."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((ch) => (
          <Card key={ch.name} className="p-6">
            <div className="text-lg font-bold">{ch.name}</div>
            <div className="mt-1 text-sm text-slate-600">
              {ch.country} • {ch.frequency}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {ch.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full" type="button">
                View chapter
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-xl2 border border-slate-200 bg-slate-50 p-8">
        <div className="text-xl font-bold">Start a chapter</div>
        <p className="mt-2 text-slate-600">
          Want to lead meetups in your city? We will support you with a simple process.
        </p>
        <div className="mt-5">
          <Button>Start a chapter</Button>
        </div>
      </div>
    </Container>
  );
}
