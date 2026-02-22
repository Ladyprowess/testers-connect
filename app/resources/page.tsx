import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ResourcesExplorer from "@/components/resources/ResourcesExplorer";
import { getResources } from "@/lib/db/resources";

export const dynamic = "force-dynamic"; 
export const revalidate = 0;

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <Container className="py-14">
      <SectionHeading
        eyebrow="Resources"
        title="Guides and templates"
        desc="Short, practical resources that help you improve as a QA engineer."
      />

      <ResourcesExplorer initialResources={resources} />
    </Container>
  );
}
