"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type DbEventLite = {
  title: string;
  slug: string;
  event_date: string;
  mode: "Online" | "In-person";
  city: string | null;
  description: string;
  tags: string[];
  is_published: boolean;
  cover_image_url: string | null;

  // ✅ NEW
  register_url: string | null;
};

type FormState = {
  title: string;
  slug: string;
  event_date: string;
  mode: "Online" | "In-person";
  city: string;
  description: string;
  tags: string; // comma separated
  is_published: boolean;
  cover_image_url: string | null;

  // ✅ NEW (string for input)
  register_url: string;
};

const empty: FormState = {
  title: "",
  slug: "",
  event_date: "",
  mode: "Online",
  city: "",
  description: "",
  tags: "",
  is_published: true,
  cover_image_url: null,
  register_url: "", // ✅
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<DbEventLite[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [form, setForm] = useState<FormState>(empty);
  const [msg, setMsg] = useState("");
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const isEditing = useMemo(() => Boolean(selectedSlug), [selectedSlug]);

  const canSave = useMemo(() => {
    return Boolean(form.title && form.slug && form.event_date);
  }, [form.title, form.slug, form.event_date]);

  async function loadEvents() {
    setLoadingList(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/events/list");
      const json = await res.json();

      if (!json.ok) {
        setMsg(json.error || "Failed to load events");
        return;
      }

      setEvents(json.items || []);
    } catch {
      setMsg("Failed to load events");
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function selectEvent(slug: string) {
    const e = events.find((x) => x.slug === slug);
    if (!e) return;

    setSelectedSlug(e.slug);
    setForm({
      title: e.title,
      slug: e.slug,
      event_date: e.event_date,
      mode: e.mode,
      city: e.city || "",
      description: e.description,
      tags: (e.tags || []).join(", "),
      is_published: e.is_published,
      cover_image_url: e.cover_image_url,

      // ✅ NEW
      register_url: e.register_url || "",
    });
    setMsg("");
  }

  function newEvent() {
    setSelectedSlug("");
    setForm(empty);
    setMsg("");
  }

  async function uploadCover(file: File) {
    if (!form.slug) {
      setMsg("Add a slug before uploading an image.");
      return;
    }

    setUploading(true);
    setMsg("Uploading image...");

    try {
      const bucket = "event-covers";
      const safeName = file.name.replace(/\s+/g, "-");
      const path = `${form.slug}/${Date.now()}-${safeName}`;

      const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      });

      if (upErr) {
        setMsg(upErr.message);
        return;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      setForm((p) => ({ ...p, cover_image_url: data.publicUrl }));
      setMsg("Image uploaded ✅");
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (!canSave) {
      setMsg("Title, slug, and date are required.");
      return;
    }

    setSaving(true);
    setMsg(isEditing ? "Updating..." : "Creating...");

    const payload: any = {
      ...form,
      city: form.city || null,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      cover_image_url: form.cover_image_url || null,

      // ✅ NEW (send null if empty)
      register_url: form.register_url?.trim() ? form.register_url.trim() : null,
    };

    const method = isEditing ? "PUT" : "POST";

    const res = await fetch("/api/admin/events", {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!json.ok) {
      setMsg(json.error || "Save failed");
      setSaving(false);
      return;
    }

    setMsg(isEditing ? "Updated ✅" : "Created ✅");
    await loadEvents();
    setSelectedSlug(form.slug);
    setSaving(false);
  }

  async function remove() {
    if (!form.slug) {
      setMsg("Slug is required to delete.");
      return;
    }

    const ok = confirm(`Delete "${form.title}"?`);
    if (!ok) return;

    setSaving(true);
    setMsg("Deleting...");

    const res = await fetch(`/api/admin/events?slug=${encodeURIComponent(form.slug)}`, {
      method: "DELETE",
    });

    const json = await res.json();
    if (!json.ok) {
      setMsg(json.error || "Delete failed");
      setSaving(false);
      return;
    }

    setMsg("Deleted ✅");
    await loadEvents();
    newEvent();
    setSaving(false);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Admin: Events</h1>
          <p className="mt-2 text-slate-600">Create, edit, and delete events.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={loadEvents}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900"
          >
            Refresh
          </button>

          <button
            onClick={newEvent}
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
          >
            New event
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        {/* LEFT: EVENTS LIST */}
        <aside className="lg:col-span-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-bold text-slate-900">Events</div>

            {loadingList ? (
              <div className="mt-4 text-sm text-slate-600">Loading...</div>
            ) : events.length === 0 ? (
              <div className="mt-4 text-sm text-slate-600">No events yet.</div>
            ) : (
              <div className="mt-4 grid gap-2">
                {events.map((e) => {
                  const active = e.slug === selectedSlug;
                  return (
                    <button
                      key={e.slug}
                      onClick={() => selectEvent(e.slug)}
                      className={`text-left rounded-2xl border px-4 py-3 ${
                        active
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-sm font-semibold line-clamp-2">{e.title}</div>
                      <div className={`mt-1 text-xs ${active ? "text-white/80" : "text-slate-500"}`}>
                        {e.event_date} • {e.is_published ? "Published" : "Draft"}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT: FORM */}
        <main className="lg:col-span-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-bold text-slate-900">
                {isEditing ? "Edit event" : "Create event"}
              </div>
              {msg && <div className="text-sm text-slate-700">{msg}</div>}
            </div>

            <div className="mt-6 grid gap-4">
              <input
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((p) => ({
                    ...p,
                    title,
                    slug: !isEditing && !p.slug ? slugify(title) : p.slug,
                  }));
                }}
                placeholder="Title"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />

              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                placeholder="Slug (unique)"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={form.event_date}
                  onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                  placeholder="Event date (YYYY-MM-DD)"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                />

                <select
                  value={form.mode}
                  onChange={(e) => setForm({ ...form, mode: e.target.value as any })}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                >
                  <option value="Online">Online</option>
                  <option value="In-person">In-person</option>
                </select>
              </div>

              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="City (optional)"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />

              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Description"
                rows={7}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />

              {/* ✅ NEW: register/view link */}
              <input
                value={form.register_url}
                onChange={(e) => setForm({ ...form, register_url: e.target.value })}
                placeholder="Register / View link (optional)"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />

              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="Tags (comma separated)"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />

              {/* IMAGE UPLOAD */}
              <div className="rounded-3xl border border-slate-200 p-5">
                <div className="text-sm font-semibold text-slate-900">Cover image</div>
                <div className="mt-4 grid gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadCover(f);
                    }}
                    className="text-sm"
                  />

                  {form.cover_image_url ? (
                    <div className="grid gap-3">
                      <img
                        src={form.cover_image_url}
                        alt="Event cover"
                        className="w-full max-w-lg rounded-3xl border border-slate-200 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, cover_image_url: null }))}
                        className="w-fit rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900"
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-600">No image yet.</div>
                  )}
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                />
                Published
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={save}
                  disabled={!canSave || saving}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {isEditing ? "Update event" : "Create event"}
                </button>

                {isEditing && (
                  <button
                    onClick={remove}
                    disabled={saving}
                    className="rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-700 disabled:opacity-50"
                  >
                    Delete
                  </button>
                )}
              </div>

              <div className="text-xs text-slate-500">
                Update/Delete uses <b>slug</b>. Keep slugs unique.
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
