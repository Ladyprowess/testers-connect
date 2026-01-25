"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Tag from "@/components/Tag";

type ResourceItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  url: string | null;
  category: string | null;
  stage: string | null;
  created_at: string;
  cover_path: string | null;

  // ✅ PDF support
  file_path: string | null;
};

type ReviewItem = {
  id: string;
  resource_id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export default function ResourcesExplorer({
  initialResources,
}: {
  initialResources: ResourceItem[];
}) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

  const [query, setQuery] = useState("");

  // Desktop-only filter state (mobile/tablet will ignore these)
  const [category, setCategory] = useState("All");
  const [stage, setStage] = useState("All");
  const [type, setType] = useState("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialResources.forEach((r) => r.category && set.add(r.category));
    return ["All", ...Array.from(set).sort()];
  }, [initialResources]);

  const stages = useMemo(() => {
    const set = new Set<string>();
    initialResources.forEach((r) => r.stage && set.add(r.stage));
    return ["All", ...Array.from(set).sort()];
  }, [initialResources]);

  const types = useMemo(() => {
    const set = new Set<string>();
    initialResources.forEach((r) => r.type && set.add(r.type));
    return ["All", ...Array.from(set).sort()];
  }, [initialResources]);

  // Detect mobile/tablet (no filters, only search)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)"); // < lg
    const update = () => setIsMobileOrTablet(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return initialResources.filter((r) => {
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.tags || []).some((t) => t.toLowerCase().includes(q));

      // ✅ On mobile/tablet: ignore filters completely
      if (isMobileOrTablet) return matchesQuery;

      // ✅ On desktop: apply filters + search
      const matchesCategory = category === "All" || r.category === category;
      const matchesStage = stage === "All" || r.stage === stage;
      const matchesType = type === "All" || r.type === type;

      return matchesQuery && matchesCategory && matchesStage && matchesType;
    });
  }, [initialResources, query, category, stage, type, isMobileOrTablet]);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setStage("All");
    setType("All");
  };

  // Modal + reviews state
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ResourceItem | null>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function getCoverUrl(path: string | null) {
    return path
      ? `${SUPABASE_URL}/storage/v1/object/public/resources-covers/${path}`
      : null;
  }

  function getPdfUrl(path: string | null) {
    return path
      ? `${SUPABASE_URL}/storage/v1/object/public/resources-files/${path}`
      : null;
  }

  async function loadReviews(resourceId: string) {
    setLoadingReviews(true);
    try {
      const res = await fetch(`/api/resource-reviews?resource_id=${resourceId}`);
      const json = await res.json();
      setReviews(json?.reviews ?? []);
    } finally {
      setLoadingReviews(false);
    }
  }

  function openModal(r: ResourceItem) {
    setActive(r);
    setOpen(true);
    setReviews([]);
    loadReviews(r.id);
  }

  function closeModal() {
    setOpen(false);
    setActive(null);
    setReviews([]);
    setReviewName("");
    setReviewRating(5);
    setReviewComment("");
  }

  async function submitReview() {
    if (!active) return;
    if (!reviewName.trim() || !reviewComment.trim()) return;

    setSubmitting(true);
    try {
      await fetch("/api/resource-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource_id: active.id,
          name: reviewName.trim(),
          rating: reviewRating,
          comment: reviewComment.trim(),
        }),
      });

      setReviewComment("");
      setReviewRating(5);
      await loadReviews(active.id);
    } finally {
      setSubmitting(false);
    }
  }

  // ESC to close modal
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="mt-10">
      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
        <span className="text-slate-400">🔎</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources..."
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Filters (Desktop only) */}
        <Card className="hidden h-fit p-6 lg:block">
          <div className="text-base font-bold">Filters</div>

          <div className="mt-5">
            <div className="text-sm font-semibold">Category</div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5">
            <div className="text-sm font-semibold">Stage</div>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {stages.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5">
            <div className="text-sm font-semibold">Type</div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <Button type="button" variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div>
          <div className="text-sm text-slate-600">
            Showing {filtered.length} of {initialResources.length} resources
          </div>

          <div className="mt-5">
            {filtered.length === 0 ? (
              <Card className="p-6">
                <div className="text-sm text-slate-600">
                  No resources found. Try a different search or clear filters.
                </div>
              </Card>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {filtered.map((r) => {
                  const coverUrl = getCoverUrl(r.cover_path);

                  return (
                    <Card key={r.id} className="p-6">
                      {coverUrl ? (
                        <div className="mb-4 overflow-hidden rounded-xl border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={coverUrl}
                            alt={`${r.title} cover`}
                            className="h-40 w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ) : null}

                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-lg font-bold">{r.title}</div>
                          <div className="mt-1 text-sm text-slate-600">
                            {r.type}
                            {r.category ? ` • ${r.category}` : ""}
                            {r.stage ? ` • ${r.stage}` : ""}
                          </div>

                          <p className="mt-3 text-slate-600">{r.description}</p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {(r.tags || []).map((t) => (
                              <Tag key={t} label={t} />
                            ))}
                          </div>

                          {r.url ? (
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-3 inline-block text-sm font-semibold hover:underline"
                            >
                              Open Resources
                            </a>
                          ) : null}
                        </div>

                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => openModal(r)}
                        >
                          Open
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && active ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="font-bold text-lg">{active.title}</div>
              <button
                onClick={closeModal}
                className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50"
                type="button"
              >
                Close
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto p-6">
              {/* Cover */}
              {active.cover_path ? (
                <div className="mb-5 overflow-hidden rounded-xl border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getCoverUrl(active.cover_path) as string}
                    alt={`${active.title} cover`}
                    className="h-52 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : null}

              <div className="text-sm text-slate-600">
                {active.type}
                {active.category ? ` • ${active.category}` : ""}
                {active.stage ? ` • ${active.stage}` : ""}
              </div>

              <p className="mt-3 text-slate-700">{active.description}</p>

              {/* ✅ PDF viewer */}
              <div className="mt-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-semibold">Read PDF</div>

                  {active.file_path ? (
                    <a
                      href={getPdfUrl(active.file_path) as string}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                    >
                      Download PDF
                    </a>
                  ) : null}
                </div>

                {active.file_path ? (
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                    <iframe
                      title={`${active.title} PDF`}
                      src={getPdfUrl(active.file_path) as string}
                      className="h-[70vh] w-full"
                    />
                  </div>
                ) : (
                  <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm text-slate-600">
                      No PDF uploaded for this resource yet.
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {(active.tags || []).map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>

              {/* External link */}
              {active.url ? (
                <a
                  href={active.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-semibold hover:underline"
                >
                  Open resource link
                </a>
              ) : null}

              {/* Reviews */}
              <div className="mt-8">
                <div className="text-base font-bold">Reviews</div>

                {loadingReviews ? (
                  <div className="mt-3 text-sm text-slate-600">
                    Loading reviews…
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="mt-3 text-sm text-slate-600">
                    No reviews yet. Be the first.
                  </div>
                ) : (
                  <div className="mt-4 grid gap-3">
                    {reviews.map((rv) => (
                      <div
                        key={rv.id}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-semibold">{rv.name}</div>
                          <div className="text-sm text-slate-600">
                            {rv.rating}/5
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-slate-700">
                          {rv.comment}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add review */}
                <div className="mt-6 rounded-xl border border-slate-200 p-4">
                  <div className="font-semibold">Leave a review</div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <input
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="Your name"
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />

                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                    >
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Good</option>
                      <option value={3}>3 - Okay</option>
                      <option value={2}>2 - Poor</option>
                      <option value={1}>1 - Bad</option>
                    </select>
                  </div>

                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Write your comment…"
                    className="mt-3 min-h-[90px] w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  />

                  <button
                    type="button"
                    onClick={submitReview}
                    disabled={
                      submitting || !reviewName.trim() || !reviewComment.trim()
                    }
                    className="mt-3 inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Submit review"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
