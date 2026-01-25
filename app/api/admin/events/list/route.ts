import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const admin = supabaseAdmin();

  const { data, error } = await admin
    .from("events")
    .select(
      `
      title,
      slug,
      event_date,
      mode,
      city,
      description,
      tags,
      is_published,
      cover_image_url,
      register_url,
      event_type
    `
    )
    .order("event_date", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { ok: true, items: data ?? [] },
    { status: 200 }
  );
}
