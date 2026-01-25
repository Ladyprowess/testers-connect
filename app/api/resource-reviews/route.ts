import { NextResponse } from "next/server";
import { supabasePublic } from "@/lib/supabase/public";

function isUuid(v: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const resource_id = searchParams.get("resource_id");

  if (!resource_id) {
    return NextResponse.json(
      { ok: false, message: "resource_id is required" },
      { status: 400 }
    );
  }

  if (!isUuid(resource_id)) {
    return NextResponse.json(
      { ok: false, message: "Invalid resource_id" },
      { status: 400 }
    );
  }

  const { data, error } = await supabasePublic
    .from("resource_reviews")
    .select("id,resource_id,name,rating,comment,created_at")
    .eq("resource_id", resource_id)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, reviews: data ?? [] });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const resource_id = String(body?.resource_id ?? "").trim();
  const name = String(body?.name ?? "").trim();
  const comment = String(body?.comment ?? "").trim();
  const rating = Number(body?.rating);

  if (!resource_id || !name || !comment || !Number.isFinite(rating)) {
    return NextResponse.json(
      { ok: false, message: "resource_id, name, rating, comment are required" },
      { status: 400 }
    );
  }

  if (!isUuid(resource_id)) {
    return NextResponse.json(
      { ok: false, message: "Invalid resource_id" },
      { status: 400 }
    );
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json(
      { ok: false, message: "rating must be 1-5" },
      { status: 400 }
    );
  }

  // Basic limits
  if (name.length > 60) {
    return NextResponse.json(
      { ok: false, message: "name is too long" },
      { status: 400 }
    );
  }

  if (comment.length > 800) {
    return NextResponse.json(
      { ok: false, message: "comment is too long" },
      { status: 400 }
    );
  }

  const { data, error } = await supabasePublic
    .from("resource_reviews")
    .insert([{ resource_id, name, rating, comment, is_published: true }])
    .select("id,resource_id,name,rating,comment,created_at")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, review: data });
}
