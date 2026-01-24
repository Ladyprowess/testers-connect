import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-3 text-slate-600">
          The page you are looking for does not exist.
        </p>
        <div className="mt-6">
          <Link href="/">
            <Button>Go to home</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
