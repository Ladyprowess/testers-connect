"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

function req(v: FormDataEntryValue | null) {
  return String(v ?? "").trim();
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createResource(formData: FormData): Promise<void> {
  const title = req(formData.get("title"));
  const type = req(formData.get("type"));
  const description = req(formData.get("description"));

  // ✅ require core fields
  if (!title || !type || !description) return;

  // ✅ generate slug from title
  let slugBase = slugify(title);
  if (!slugBase) slugBase = `resource-${Date.now()}`;
  const slug = `${slugBase}-${crypto.randomUUID().slice(0, 6)}`;

  const url = req(formData.get("url")) || null;
  const category = req(formData.get("category")) || null;
  const stage = req(formData.get("stage")) || null;

  const tagsRaw = req(formData.get("tags"));
  const tags =
    tagsRaw.length > 0
      ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

  const is_published = req(formData.get("is_published")) !== "false";

  // ✅ PDF upload (bucket upload)
  const pdfFile = formData.get("pdf") as File | null;
  let file_path: string | null = null;

  if (pdfFile && pdfFile.size > 0) {
    if (pdfFile.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed");
    }

    if (pdfFile.size > 10 * 1024 * 1024) {
      throw new Error("PDF must be under 10MB");
    }

    file_path = `pdfs/${crypto.randomUUID()}.pdf`;

    const { error: pdfError } = await supabaseAdmin.storage
      .from("resources-files")
      .upload(file_path, pdfFile, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (pdfError) throw new Error(pdfError.message);
  }

  // ✅ cover file (bucket upload)
  const coverFile = formData.get("cover") as File | null;
  let cover_path: string | null = null;

  if (coverFile && coverFile.size > 0) {
    const isImage =
      coverFile.type === "image/png" ||
      coverFile.type === "image/jpeg" ||
      coverFile.type === "image/webp";

    if (!isImage) {
      throw new Error("Cover must be PNG, JPG, or WEBP");
    }

    if (coverFile.size > 3 * 1024 * 1024) {
      throw new Error("Cover image must be under 3MB");
    }

    const ext =
      coverFile.type === "image/png"
        ? "png"
        : coverFile.type === "image/webp"
        ? "webp"
        : "jpg";

    cover_path = `covers/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("resources-covers")
      .upload(cover_path, coverFile, {
        contentType: coverFile.type,
        upsert: false,
      });

    if (uploadError) throw new Error(uploadError.message);
  }

  // ✅ insert into DB (IMPORTANT: include file_path)
  const { error } = await supabaseAdmin.from("resources").insert([
    {
      title,
      slug,
      type,
      description,
      url,
      category,
      stage,
      tags,
      is_published,
      cover_path,
      file_path, // ✅ PDF path saved here
    },
  ]);

  if (error) throw new Error(error.message);

  redirect("/admin/resources?created=1");

}
