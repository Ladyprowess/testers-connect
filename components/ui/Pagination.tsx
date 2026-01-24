import Link from "next/link";

export default function Pagination({
  page,
  totalPages,
  makeHref,
}: {
  page: number;
  totalPages: number;
  makeHref: (page: number) => string;
}) {
  const prev = page - 1;
  const next = page + 1;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex flex-wrap items-center gap-2">
      <Link
        href={makeHref(Math.max(1, prev))}
        aria-disabled={page === 1}
        className={`rounded-xl border px-3 py-2 text-sm font-semibold ${
          page === 1 ? "pointer-events-none opacity-50" : "hover:bg-slate-50"
        }`}
      >
        Prev
      </Link>

      <div className="flex flex-wrap gap-2">
        {pages.map((p) => (
          <Link
            key={p}
            href={makeHref(p)}
            className={`rounded-xl border px-3 py-2 text-sm font-semibold ${
              p === page
                ? "border-slate-900 bg-slate-900 text-white"
                : "hover:bg-slate-50"
            }`}
          >
            {p}
          </Link>
        ))}
      </div>

      <Link
        href={makeHref(Math.min(totalPages, next))}
        aria-disabled={page === totalPages}
        className={`rounded-xl border px-3 py-2 text-sm font-semibold ${
          page === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-slate-50"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
