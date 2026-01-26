import React from "react";

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl2 border border-border bg-background text-foreground shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}
