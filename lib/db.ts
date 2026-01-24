import { supabase } from "@/lib/supabaseClient";

/* =========================
   TYPES
========================= */

export type DbEvent = {
  id: string;
  title: string;
  slug: string;
  event_date: string; // YYYY-MM-DD (or full date string)
  mode: "Online" | "In-person";
  city: string | null;
  description: string;
  tags: string[];
  cover_image_url?: string | null;
  register_url?: string | null; // ✅ NEW
};

export type DbCourse = {
  id: string;
  title: string;
  slug: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  description: string;
  tags: string[];
};

export type DbResource = {
  id: string;
  title: string;
  slug: string;
  type: "Guide" | "Template" | "Article" | "Video";
  description: string;
  tags: string[];
  url: string | null;
};

type EventsView = "upcoming" | "past";

/* =========================
   HELPERS
========================= */

function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

/* =========================
   EVENTS (simple list)
========================= */

export async function getEvents(): Promise<DbEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select(
      "id,title,slug,event_date,mode,city,description,tags,cover_image_url,register_url"
    )
    .eq("is_published", true)
    .order("event_date", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getEventBySlug(slug: string): Promise<DbEvent | null> {
  const { data, error } = await supabase
    .from("events")
    .select(
      "id,title,slug,event_date,mode,city,description,tags,cover_image_url,register_url"
    )
    .eq("is_published", true)
    .eq("slug", slug);

  if (error) throw new Error(error.message);
  return data?.[0] ?? null;
}

/* =========================
   EVENTS (pagination)
========================= */

export async function getEventsPaged({
  view,
  page,
  pageSize,
}: {
  view: EventsView;
  page: number;
  pageSize: number;
}): Promise<{ items: DbEvent[]; totalPages: number; totalCount: number }> {
  const today = todayISODate();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let q = supabase
    .from("events")
    .select(
      "id,title,slug,event_date,mode,city,description,tags,cover_image_url,register_url",
      { count: "exact" }
    )
    .eq("is_published", true);

  if (view === "upcoming") {
    q = q.gte("event_date", today).order("event_date", { ascending: true });
  } else {
    q = q.lt("event_date", today).order("event_date", { ascending: false });
  }

  const { data, error, count } = await q.range(from, to);

  if (error) throw new Error(error.message);

  const totalCount = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return {
    items: data ?? [],
    totalPages,
    totalCount,
  };
}

/* =========================
   EVENTS (sidebar list)
========================= */

export async function getEventsSidebarList({
  view,
  limit = 6,
}: {
  view: EventsView;
  limit?: number;
}): Promise<
  Pick<DbEvent, "id" | "title" | "slug" | "event_date" | "cover_image_url" | "register_url">[]
> {
  const today = todayISODate();

  let q = supabase
    .from("events")
    .select("id,title,slug,event_date,cover_image_url,register_url")
    .eq("is_published", true);

  if (view === "upcoming") {
    q = q.gte("event_date", today).order("event_date", { ascending: true });
  } else {
    q = q.lt("event_date", today).order("event_date", { ascending: false });
  }

  const { data, error } = await q.limit(limit);

  if (error) throw new Error(error.message);
  return data ?? [];
}

/* =========================
   COURSES
========================= */

export async function getWebinars(): Promise<DbWebinar[]> {
  const { data, error } = await supabase
    .from("webinars")
    .select(
      "id,title,slug,level,duration,description,tags,webinar_date,mode,join_url,replay_url,cover_image_url"
    )
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

/* =========================
   RESOURCES
========================= */

export async function getResources(): Promise<DbResource[]> {
  const { data, error } = await supabase
    .from("resources")
    .select("id,title,slug,type,description,tags,url")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
