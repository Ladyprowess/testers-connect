import Container from "@/components/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function CommunityPage() {
  return (
    <Container className="py-14">
      <h1 className="text-3xl font-bold tracking-tight">Join community</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Join Testers Connect to get event updates, resources, and support from other testers.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="text-lg font-bold">What you get</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
            <li>Event updates</li>
            <li>Learning resources</li>
            <li>Local chapters</li>
            <li>Friendly support</li>
          </ul>
        </Card>

        <Card className="p-6">
          <div className="text-lg font-bold">Join now</div>
          <p className="mt-2 text-slate-600">
            This is a demo UI. You can connect a real form later.
          </p>
          <div className="mt-6">
            <Button className="w-full" type="button">Join</Button>
          </div>
        </Card>
      </div>
    </Container>
  );
}
