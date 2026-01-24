import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const SELECT_FIELDS =
  "title,slug,event_date,mode,city,description,tags,is_published,cover_image_url,register_url";

function pickCreateFields(body: any) {
  return {
    title: body.title ?? "",
    slug: body.slug ?? "",
    event_date: body.event_date ?? "",
    mode: body.mode ?? "Online",
    city: body.city ?? null,
    description: body.description ?? "",
    tags: Array.isArray(body.tags) ? body.tags : [],
    is_published: typeof body.is_published === "boolean" ? body.is_published : true,
    cover_image_url: body.cover_image_url ?? null,
    register_url: body.register_url ?? null,
  };
}

/**
 * ✅ IMPORTANT
 * For updates, only include keys that exist in the request body,
 * so you don’t wipe old values with "" or [].
 */
function pickUpdateFields(body: any) {
  const patch: Record<string, any> = {};

  if ("title" in body) patch.title = body.title ?? "";
  if ("event_date" in body) patch.event_date = body.event_date ?? "";
  if ("mode" in body) patch.mode = body.mode ?? "Online";
  if ("city" in body) patch.city = body.city ?? null;
  if ("description" in body) patch.description = body.description ?? "";
  if ("tags" in body) patch.tags = Array.isArray(body.tags) ? body.tags : [];
  if ("is_published" in body)
    patch.is_published = typeof body.is_published === "boolean" ? body.is_published : true;

  if ("cover_image_url" in body) patch.cover_image_url = body.cover_image_url ?? null;
  if ("register_url" in body) patch.register_url = body.register_url ?? null;

  return patch;
}

export async function POST(req: Request) {
  const body = await req.json();
  const admin = supabaseAdmin();

  const payload = pickCreateFields(body);

  if (!payload.title || !payload.slug || !payload.event_date) {
    return NextResponse.json(
      { ok: false, error: "Missing title, slug, or event_date" },
      { status: 400 }
    );
  }

  const { data, error } = await admin
    .from("events")
    .insert([payload])
    .select(SELECT_FIELDS)
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, item: data }, { status: 200 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const slug = body?.slug;

  if (!slug) {
    return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });
  }

  const admin = supabaseAdmin();
  const patch = pickUpdateFields(body);

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ ok: false, error: "Nothing to update" }, { status: 400 });
  }

  const { data, error } = await admin
    .from("events")
    .update(patch)
    .eq("slug", slug)
    .select(SELECT_FIELDS)
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, item: data }, { status: 200 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });
  }

  const admin = supabaseAdmin();

  const { error } = await admin.from("events").delete().eq("slug", slug);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
