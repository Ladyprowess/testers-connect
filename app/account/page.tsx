import Container from "@/components/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function AccountPage() {
  return (
    <Container className="py-14">
      <h1 className="text-3xl font-bold tracking-tight">Account</h1>
      <p className="mt-2 text-slate-600">
        This is a placeholder page. You can connect auth later.
      </p>

      <div className="mt-8">
        <Card className="p-6">
          <div className="text-lg font-bold">Sign in</div>
          <p className="mt-2 text-slate-600">
            Add Supabase Auth or any auth provider when ready.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button type="button">Sign in</Button>
            <Button type="button" variant="outline">
              Create account
            </Button>
          </div>
        </Card>
      </div>
    </Container>
  );
}
