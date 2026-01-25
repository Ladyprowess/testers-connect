import { supabasePublic } from "@/lib/supabase/public";

export type DbResource = {
  id: string;
  title: string;
  slug: string;
  type: string;
  description: string;
  tags: string[];
  url: string | null;

  category: string | null;
  stage: string | null;

  cover_path: string | null; // cover image
  file_path: string | null;  // PDF file

  created_at: string;
};

export async function getResources(): Promise<DbResource[]> {
  const { data, error } = await supabasePublic
    .from("resources")
    .select(`
      id,
      title,
      slug,
      type,
      description,
      tags,
      url,
      category,
      stage,
      cover_path,
      file_path,
      created_at
    `)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
