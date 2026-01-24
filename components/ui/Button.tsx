import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

const styles = {
  base: "inline-flex items-center justify-center rounded-full font-medium transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-brand-200",
  size: {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  },
  variant: {
    primary:
      "bg-brand-600 text-white hover:bg-brand-700 shadow-soft",
    secondary:
      "bg-brand-50 text-brand-700 hover:bg-brand-100",
    outline:
      "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
    ghost:
      "bg-transparent text-slate-900 hover:bg-slate-100",
  },
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`${styles.base} ${styles.size[size]} ${styles.variant[variant]} ${className}`}
    />
  );
}
