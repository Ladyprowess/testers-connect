import React from "react";

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const { className = "", ...rest } = props;

  return (
    <input
      {...rest}
      className={`
        w-full rounded-xl
        border border-border
        bg-background text-foreground
        px-4 py-3 text-sm
        outline-none
        placeholder:text-muted
        focus:ring-2 focus:ring-brand
        ${className}
      `}
    />
  );
}
