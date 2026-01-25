import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function EngagePage() {
  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Engage"
        title="Get involved"
        desc="Speak, volunteer, lead a chapter, or help new testers."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            id: "speak",
            title: "Speak at an event",
            desc: "Share your story, your lessons, and your tips with the community.",
          },
          {
            id: "volunteer",
            title: "Volunteer",
            desc: "Help with event support, moderation, and simple community tasks.",
          },
          {
            id: "apply",
            title: "Become a Mentor",
            desc: "Start meetups in your city and grow a strong local community.",
          },
        ].map((x) => (
          <Card key={x.id} className="p-6">
            <div className="text-lg font-bold" id={x.id}>
              {x.title}
            </div>
            <p className="mt-3 text-slate-600">{x.desc}</p>
            <div className="mt-6">
              <Button variant="secondary">Apply</Button>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
