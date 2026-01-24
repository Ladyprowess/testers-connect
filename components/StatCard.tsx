import Card from "@/components/ui/Card";

export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Card className="p-5">
      <div className="text-2xl font-bold">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </Card>
  );
}
