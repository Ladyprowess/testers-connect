export default function Tag({ label }: { label: string }) {
    return (
      <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
        {label}
      </span>
    );
  }
  