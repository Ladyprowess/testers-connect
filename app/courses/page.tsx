import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/ui/Card";
import Tag from "@/components/Tag";
import Button from "@/components/ui/Button";
import { getCourses } from "@/lib/db";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Courses"
        title="Courses made simple"
        desc="Short learning paths that help you practise and improve."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {courses.map((c) => (
          <Card key={c.id} className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-bold">{c.title}</div>
                <div className="mt-1 text-sm text-slate-600">
                  {c.level} • {c.duration}
                </div>
                <p className="mt-3 text-slate-600">{c.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              </div>
              <Button variant="secondary" type="button">
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
