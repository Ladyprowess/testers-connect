import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Mic2,
  HandHeart,
  GraduationCap,
  Users,
  Briefcase,
  Globe2,
  ArrowRight,
} from "lucide-react";

export default function EngagePage() {
  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Engage"
        title="Get involved"
        desc="Speak, volunteer, lead a chapter, or help new testers."
      />

      {/* Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            id: "speak",
            title: "Speak at an event",
            desc: "Share your story, lessons, and practical tips with the community.",
            icon: Mic2,
            cta: "Apply to speak",
          },
          {
            id: "volunteer",
            title: "Volunteer",
            desc: "Support events, help with moderation, and take on simple community tasks.",
            icon: HandHeart,
            cta: "Volunteer",
          },
          {
            id: "mentor",
            title: "Become a Mentor",
            desc: "Guide new testers with direction, feedback, and real-world support.",
            icon: GraduationCap,
            cta: "Apply as a mentor",
          },
        ].map((x) => {
          const Icon = x.icon;

          return (
            <Card
              key={x.id}
              className="group relative overflow-hidden p-6 border border-slate-200 bg-white"
            >
              {/* soft accent */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#145DA0]/10 blur-2xl" />

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#145DA0]/10 text-[#145DA0] ring-1 ring-[#145DA0]/15">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <div
                    className="text-lg font-extrabold tracking-tight text-slate-900"
                    id={x.id}
                  >
                    {x.title}
                  </div>
                  <p className="mt-2 text-[15px] leading-7 text-slate-600">
                    {x.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="secondary"
                  className="inline-flex items-center gap-2"
                >
                  {x.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Why get involved */}
      <div className="mt-12">
        <div className="text-xl font-extrabold tracking-tight text-slate-900">
          Why should you get involved?
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Grow your network",
              desc: "Meet testers across different levels, industries, and countries.",
              icon: Users,
            },
            {
              title: "Build your credibility",
              desc: "Speaking, mentoring, or volunteering helps you stand out professionally.",
              icon: Briefcase,
            },
            {
              title: "Make real impact",
              desc: "Help someone learn faster, avoid mistakes, and get better opportunities.",
              icon: Globe2,
            },
          ].map((y) => {
            const Icon = y.icon;

            return (
              <Card key={y.title} className="p-6 border border-slate-200 bg-slate-50">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#145DA0] ring-1 ring-slate-200">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="text-[15px] font-extrabold text-slate-900">
                      {y.title}
                    </div>
                    <p className="mt-2 text-[15px] leading-7 text-slate-600">
                      {y.desc}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Extra helpful block */}
      <Card className="mt-10 p-6 border border-slate-200 bg-white">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              Not sure where to start?
            </div>
            <p className="mt-2 text-[15px] leading-7 text-slate-600">
              Start with volunteering. It’s the easiest way to meet people, learn how we run things,
              and find your best fit.
            </p>
          </div>

          <Button className="bg-[#145DA0] text-white hover:bg-[#0f4f8a]">
            Contact us!
          </Button>
        </div>
      </Card>
    </Container>
  );
}