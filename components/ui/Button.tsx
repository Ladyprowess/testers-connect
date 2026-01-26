import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

const styles = {
  base: `
    inline-flex items-center justify-center rounded-full font-medium
    transition active:scale-[0.99]
    focus:outline-none focus:ring-2 focus:ring-brand
  `,
  size: {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  },
  variant: {
    primary: `
      bg-brand text-white
      hover:opacity-90
    `,
    secondary: `
      bg-brand-soft text-brand
      hover:opacity-90
    `,
    outline: `
      border border-border
      bg-background text-foreground
      hover:bg-brand-soft
    `,
    ghost: `
      bg-transparent text-foreground
      hover:bg-brand-soft
    `,
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
