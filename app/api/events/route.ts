import { NextResponse } from "next/server";
import { getEventsPaged } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const view = searchParams.get("view") === "past" ? "past" : "upcoming";
  const page = Math.max(1, Number(searchParams.get("page") || 1) || 1);
  const pageSize = Math.max(1, Math.min(50, Number(searchParams.get("pageSize") || 6) || 6));

  const data = await getEventsPaged({ view, page, pageSize });

  return NextResponse.json({ ok: true, ...data }, { status: 200 });
}
