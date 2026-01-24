import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Contact"
        title="Send us a message"
        desc="We will respond as soon as we can."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Card className="p-6">
            <form className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Name</label>
                <div className="mt-2">
                  <Input placeholder="Your name" />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">Email</label>
                <div className="mt-2">
                  <Input placeholder="you@email.com" type="email" />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">Message</label>
                <div className="mt-2">
                  <Textarea placeholder="Tell us what you need..." rows={6} />
                </div>
              </div>

              <Button type="button">Send message</Button>
              <p className="text-xs text-slate-500">
                This is UI only. You can connect Supabase or an API route later.
              </p>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card className="p-6">
            <div className="text-lg font-bold">Other ways</div>
            <p className="mt-3 text-slate-600">
              You can also reach us through our community channels.
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                Email: support@testersconnect.com
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                Community: Join via the “Join community” button
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
