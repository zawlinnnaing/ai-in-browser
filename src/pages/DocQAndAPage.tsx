import PageLayout from "@/components/shared/PageLayout";
import DocQAndA from "../components/doc-q-and-a/DocQAndA";

function DocQAndAPage() {
  return (
    <PageLayout
      title="Document Question and Answering"
      description="Ask questions about the content of the document image and get answers."
    >
      <div className="space-y-4">
        <DocQAndA />
        <p className="text-sm text-muted-foreground">
          If this is first time running, it may take a while to download the
          model.
        </p>
      </div>
    </PageLayout>
  );
}

export default DocQAndAPage;
