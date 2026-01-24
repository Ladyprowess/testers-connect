import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="About"
        title="We help testers grow with real support"
        desc="Testers Connect is built for learning, networking, and career progress."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="text-lg font-bold">Our mission</div>
          <p className="mt-3 text-slate-600">
            We want software testers to learn in a simple way, meet the right
            people, and build confidence through practice.
          </p>
        </Card>

        <Card className="p-6">
          <div className="text-lg font-bold">What we believe</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
            <li>Simple words help people learn faster</li>
            <li>Community makes learning easier</li>
            <li>Practice is better than noise</li>
          </ul>
        </Card>
      </div>
    </Container>
  );
}
