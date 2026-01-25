"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/ui/Card";
import { createResource } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60"
    >
      {pending ? "Creating…" : "Create resource"}
    </button>
  );
}

export default function AdminResourcesPage() {
  const searchParams = useSearchParams();

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string>("");

  const created = searchParams.get("created") === "1";

  const clearCoverPreview = () => {
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(null);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Admin"
        title="Add a resource"
        desc="Add guides, templates, articles, and helpful links for learners."
      />

      {/* ✅ Success message */}
      {created ? (
        <div className="mt-6 max-w-2xl rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          Resource created successfully.
        </div>
      ) : null}

      <Card className="mt-10 max-w-2xl p-6">
        <form
          action={createResource}
          encType="multipart/form-data"
          className="grid gap-4"
        >
          {/* Cover upload */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Cover image</span>
            <input
              name="cover"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              onChange={(e) => {
                clearCoverPreview();
                const file = e.target.files?.[0];
                if (file) setCoverPreview(URL.createObjectURL(file));
              }}
            />
            <p className="text-xs text-slate-500">
              Recommended: JPG/PNG/WebP, under 3MB.
            </p>

            {coverPreview ? (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="h-44 w-full object-cover"
                />
              </div>
            ) : null}
          </label>

          {/* Title */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Title</span>
            <input
              name="title"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="e.g. Writing strong test cases"
              required
            />
          </label>

          {/* Type */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Type</span>
            <select
              name="type"
              required
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="Guide">Guide</option>
              <option value="Template">Template</option>
              <option value="Article">Article</option>
              <option value="Video">Video</option>
            </select>
          </label>

          {/* Category */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Category</span>
            <input
              name="category"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="Manual Testing / Automation / API Testing"
            />
          </label>

          {/* Stage */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Stage</span>
            <input
              name="stage"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="Beginner / Intermediate / Advanced"
            />
          </label>

          {/* PDF upload */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Resource PDF</span>
            <input
              name="pdf"
              type="file"
              accept="application/pdf"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setPdfName(f?.name ?? "");
              }}
            />
            <p className="text-xs text-slate-500">
              Upload a PDF learners can read or download (recommended: under
              10MB).
            </p>
            {pdfName ? (
              <p className="text-xs text-slate-600">
                Selected PDF: <span className="font-semibold">{pdfName}</span>
              </p>
            ) : null}
          </label>

          {/* Description */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Description</span>
            <textarea
              name="description"
              className="min-h-[110px] rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="What the resource helps the learner do"
              required
            />
          </label>

          {/* Tags */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Tags (comma-separated)</span>
            <input
              name="tags"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="qa basics, test cases, career"
            />
          </label>

          {/* URL */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold">URL (optional)</span>
            <input
              name="url"
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="https://..."
            />
          </label>

          {/* Publish */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Publish</span>
            <select
              name="is_published"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              defaultValue="true"
            >
              <option value="true">Yes (visible)</option>
              <option value="false">No (draft)</option>
            </select>
          </label>

          {/* ✅ Loading submit button */}
          <SubmitButton />
        </form>
      </Card>
    </Container>
  );
}
