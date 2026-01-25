import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const full_name = String(body?.name || body?.full_name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const message = String(body?.message || "").trim();

    // Honeypot (optional)
    const company_site = String(body?.company_site || "").trim();
    if (company_site) return NextResponse.json({ ok: true });

    if (!full_name || !email || !email.includes("@") || !message) {
      return NextResponse.json(
        { ok: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const { error: mailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [process.env.RESEND_TO!, email], // admin + user
      replyTo: email,
      subject: `New contact message — Testers Connect`,
      template: {
        id: "contact",
        variables: {
          full_name,
          email,
          message,
          source: "testersconnect",
        },
      },
    });

    if (mailError) {
      console.error("RESEND ERROR:", mailError);
      return NextResponse.json(
        { ok: false, error: mailError.message || "Email failed to send." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT API ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Message failed. Try again." },
      { status: 500 }
    );
  }
}