"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  label: string;
  value: string; // e.g. "25,000+" or "30+" or "400+"
};

function parseRange(value: string) {
  const base = Number(value.replace(/[^\d]/g, "")) || 0;

  if (base <= 100) {
    return { min: 1, max: base + 20 };
  }

  const wiggle = Math.max(50, Math.floor(base * 0.03)); // ~3%
  return {
    min: Math.max(1, base - wiggle),
    max: base + wiggle,
  };
}

export default function StatCard({ label, value }: Props) {
  const { min, max } = useMemo(() => parseRange(value), [value]);
  const base = Number(value.replace(/[^\d]/g, "")) || 0;

  const [count, setCount] = useState(base);

  // animate to target
  const animateTo = (target: number) => {
    const start = count;
    const diff = target - start;
    const duration = 700;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(start + diff * eased));
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    // initial animation
    animateTo(base);

    // random tick every few seconds
    const tick = () => {
      const next =
        Math.floor(Math.random() * (max - min + 1)) + min;
      animateTo(next);
    };

    const interval = setInterval(tick, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col items-center gap-2 text-center">
      {/* Number */}
      <div className="text-3xl font-extrabold tracking-tight text-slate-900">
        {count.toLocaleString()}
        <span className="text-slate-400">+</span>
      </div>
  
      {/* Label */}
      <div className="text-sm font-medium text-slate-600">{label}</div>
  
      {/* subtle divider (centered, not full width) */}
      <div className="mt-3 h-px w-2/3 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}  