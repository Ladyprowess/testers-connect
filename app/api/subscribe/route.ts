import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!, // your verified sender
      to: email,                            // customer email
      subject: "Welcome to Testers Connect 🎉",
      template: {
        id: "website-subscribe", // published template ID or alias
        variables: {},           // only if template expects variables
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
