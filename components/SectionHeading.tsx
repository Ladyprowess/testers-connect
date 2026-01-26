import React from "react";

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
        <p className="text-sm font-semibold text-brand">{eyebrow}</p>
      ) : null}

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>

      {desc ? <p className="mt-3 text-muted">{desc}</p> : null}
    </div>
  );
}
