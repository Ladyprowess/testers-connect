"use client";

import { useState } from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ✅ Update these to your real details
  const SUPPORT_EMAIL = "support@testersconnect.com";
  const WHATSAPP_NUMBER = "+44 7881 189923"; // put your real WhatsApp line here
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;
  const LOCATION = "Manchester, UK";
  const HOURS = "Mon–Fri, 9AM–5PM WAT";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white">
      <Container className="py-14">
        <SectionHeading
          eyebrow="Contact"
          title="Send us a message"
          desc="We will respond as soon as we can."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* LEFT: FORM CARD */}
          <div className="lg:col-span-7">
            <Card className="bg-white border border-slate-200/70 shadow-sm p-6 sm:p-8">
              <div className="mb-6">
                <div className="text-2xl font-bold text-slate-900">
                  Send Us a Message
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-semibold text-slate-900">
                    Full Name <span className="text-slate-400">*</span>
                  </label>
                  <div className="mt-2">
                    <Input
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-900">
                      Email Address <span className="text-slate-400">*</span>
                    </label>
                    <div className="mt-2">
                      <Input
                        placeholder="you@email.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-900">
                    Message <span className="text-slate-400">*</span>
                  </label>
                  <div className="mt-2">
                    <Textarea
                      placeholder="Tell us what you need..."
                      rows={7}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* FORCE BUTTON VISIBLE */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl py-3 font-semibold text-white bg-[#145DA0] hover:opacity-95 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>

                {success && (
                  <p className="text-sm text-slate-700">
                    ✅ Message sent successfully. We’ll reply soon.
                  </p>
                )}

                {error && <p className="text-sm text-red-600">{error}</p>}

                <p className="text-xs text-slate-500">
                  We typically respond within 24 hours on business days (Mon–Fri).
                </p>
              </form>
            </Card>
          </div>

          {/* RIGHT: GET IN TOUCH */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/70 shadow-sm rounded-2xl p-6 sm:p-8">
              <div className="text-3xl font-extrabold text-slate-900">
                Get In Touch
              </div>
              <p className="mt-2 text-sm text-slate-600">
                We’re here to help. Choose the contact method that works best for
                you.
              </p>

              <div className="mt-6 space-y-4">
                {/* Email card */}
                <Card className="bg-white border border-slate-200/70 p-5">
                  <div className="flex gap-4">
                    <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center">
                      ✉️
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-bold text-slate-900">
                        Email
                      </div>
                      <div className="text-sm text-slate-700 break-words">
                        {SUPPORT_EMAIL}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        Send us an email anytime. We respond quickly.
                      </div>
                    </div>
                  </div>
                </Card>

                {/* WhatsApp card + button */}
                <Card className="bg-white border border-slate-200/70 p-5">
                  <div className="flex gap-4">
                    <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center">
                      💬
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-lg font-bold text-slate-900">
                        WhatsApp
                      </div>
                      <div className="text-sm text-slate-700">{WHATSAPP_NUMBER}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        Quick questions? Chat with us on WhatsApp.
                      </div>

                      <div className="mt-4">
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white bg-[#145DA0] hover:opacity-95"
                        >
                          Open WhatsApp Chat
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Location card */}
                <Card className="bg-white border border-slate-200/70 p-5">
                  <div className="flex gap-4">
                    <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center">
                      📍
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-bold text-slate-900">
                        Location
                      </div>
                      <div className="text-sm text-slate-700">{LOCATION}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        UK-based with remote collaboration worldwide.
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Business Hours card */}
                <Card className="bg-white border border-slate-200/70 p-5">
                  <div className="flex gap-4">
                    <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center">
                      🕒
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-bold text-slate-900">
                        Business Hours
                      </div>
                      <div className="text-sm text-slate-700">{HOURS}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        Available for support and enquiries.
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
