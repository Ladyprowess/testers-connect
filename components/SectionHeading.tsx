export default function SectionHeading({
    eyebrow,
    title,
    desc,
  }: {
    eyebrow?: string;
    title: string;
    desc?: string;
  }) {
    return (
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-sm font-semibold text-brand-700">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {desc ? <p className="mt-3 text-slate-600">{desc}</p> : null}
      </div>
    );
  }
  