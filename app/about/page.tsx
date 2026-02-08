import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/ui/Card";
import {
  BookOpen,
  Target,
  Users,
  Handshake,
  BadgeCheck,
  TrendingUp,
  Quote,
  ShieldCheck,
  Globe,
  HeartHandshake,
  Award,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-14">
      {/* HERO / INTRO */}
      <Container>
        <div className="mb-20">
          <SectionHeading
            eyebrow="About Testers Connect"
            title="Helping QA testers grow, one step at a time"
            desc="We are a non-profit community that trains and supports people in Quality Assurance (QA) and software testing — through learning, mentorship, practice, and real opportunities."
          />
        </div>
      </Container>

      {/* WHY WE EXIST (light blue background like homepage) */}
      <section className="bg-sky-50/60 py-16">
        <Container>
          <h2 className="text-center text-2xl font-semibold text-slate-900">
            Why Testers Connect Exists
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Many people want to enter QA, but they get stuck because learning is
            confusing, guidance is limited, and experience is hard to get. We
            help you learn clearly and grow with support.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2 shadow-sm">
                  <BookOpen className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-bold">Clear learning</div>
                  <p className="mt-2 text-slate-600">
                    We break QA down into simple steps so beginners can
                    understand and build confidence.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2 shadow-sm">
                  <Target className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-bold">Practice that matters</div>
                  <p className="mt-2 text-slate-600">
                    We encourage real practice; not just watching videos — so
                    you can improve faster.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2 shadow-sm">
                  <Handshake className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-bold">Mentorship & direction</div>
                  <p className="mt-2 text-slate-600">
                    We connect learners to people who have done the work and can
                    guide them properly.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2 shadow-sm">
                  <Users className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-bold">Community support</div>
                  <p className="mt-2 text-slate-600">
                    You do not have to learn alone. We create a space where
                    people ask questions, share wins, and learn together.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2 shadow-sm">
                  <BadgeCheck className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-bold">Career readiness</div>
                  <p className="mt-2 text-slate-600">
                    We help you prepare for real roles with CV support, interview
                    preparation, and job-focused learning.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2 shadow-sm">
                  <TrendingUp className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-bold">
                    Visibility & opportunities
                  </div>
                  <p className="mt-2 text-slate-600">
                    We help testers get seen through showcases, events, and
                    connections.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* STORY SECTION */}
      <section className="py-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">
                The Story Behind Testers Connect
              </h2>

              <div className="mt-4 space-y-4 text-slate-600">
                <p>
                  Testers Connect was created to solve a simple problem: many
                  talented people want to work in QA, but they do not get the
                  right guidance, support, or safe space to learn.
                </p>
                <p>
                  People start strong, then get overwhelmed. Some do not know
                  what to learn next. Some cannot find practice projects. Others
                  are learning alone and losing motivation.
                </p>
                <p>
                  We built Testers Connect to make QA learning easier, more
                  organised, and more human — with community, mentorship, and
                  practical support.
                </p>
              </div>

              <Card className="mt-8 p-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-slate-100 p-2">
                    <Quote className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-slate-700 italic">
                      “I finally understood QA because the learning was simple
                      and I had people I could ask. I also got the confidence to
                      apply for roles.”
                    </p>
                    <div className="mt-4">
                      <div className="font-semibold text-slate-900">
                        Founder
                      </div>
                      <div className="text-sm text-slate-500">
                        Testers Connect
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <img
                  src="/assets/esther.jpg"
                  alt="Testers Connect community and learning"
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* MISSION (light blue background like homepage) */}
      <section className="bg-sky-50/60 py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Our Mission</h2>
            <p className="mx-auto mt-4 max-w-3xl text-slate-600">
              To help people build strong QA careers through clear learning,
              practical training, mentorship, and community support — so they can
              grow with confidence and get real opportunities.
            </p>
          </div>
        </Container>
      </section>

      {/* VALUES (no pills, no “feeling we aim for” block) */}
      <section className="py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Our Values</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              These values guide how we teach, support, and build the community.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-2">
                  <BookOpen className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-bold">Clarity</div>
                  <p className="mt-2 text-slate-600">
                    We explain things in simple words, with clear steps you can
                    follow.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-2">
                  <HeartHandshake className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-bold">Support</div>
                  <p className="mt-2 text-slate-600">
                    We guide learners with patience, kindness, and honest help.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-2">
                  <Target className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-bold">Practical learning</div>
                  <p className="mt-2 text-slate-600">
                    We focus on practice and real examples, not noise or hype.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-2">
                  <Users className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-bold">Community</div>
                  <p className="mt-2 text-slate-600">
                    We learn better when we learn together, so we build strong
                    connections.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-2">
                  <ShieldCheck className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-bold">Integrity</div>
                  <p className="mt-2 text-slate-600">
                    We do the right thing, keep our word, and respect people’s
                    time.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-2">
                  <TrendingUp className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <div className="text-lg font-bold">Growth</div>
                  <p className="mt-2 text-slate-600">
                    We help people improve steadily, one skill and one win at a
                    time.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      
    </div>
  );
}
