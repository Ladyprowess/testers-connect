import { supabase } from "@/lib/supabaseClient";

export type DbEvent = {
  id: string;
  title: string;
  slug: string;
  event_date: string; // date string
  mode: "Online" | "In-person";
  city: string | null;
  description: string;
  tags: string[];
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

export async function getEvents(): Promise<DbEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("id,title,slug,event_date,mode,city,description,tags")
    .eq("is_published", true)
    .order("event_date", { ascending: false }); // ✅ latest first

  if (error) throw error;
  return data ?? [];
}


export async function getEventBySlug(slug: string): Promise<DbEvent | null> {
  const { data, error } = await supabase
    .from("events")
    .select("id,title,slug,event_date,mode,city,description,tags")
    .eq("is_published", true)
    .eq("slug", slug);

  if (error) throw new Error(error.message);
  return data?.[0] ?? null;
}

export async function getCourses(): Promise<DbCourse[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("id,title,slug,level,duration,description,tags")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getResources(): Promise<DbResource[]> {
  const { data, error } = await supabase
    .from("resources")
    .select("id,title,slug,type,description,tags,url")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
