export default function Card({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <div
        className={`rounded-xl2 border border-slate-200 bg-white shadow-soft ${className}`}
      >
        {children}
      </div>
    );
  }
  