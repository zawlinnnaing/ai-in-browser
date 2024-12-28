import DocQAndA from "../components/doc-q-and-a/DocQAndA";

function DocQAndAPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl">Document Question and Answering</h1>
        <p className="text-sm text-muted-foreground">
          Ask questions about the content of the document image and get answers.
        </p>
      </div>
      <div className="space-y-4">
        <DocQAndA />
        <p className="text-sm text-muted-foreground">
          If this is first time running, it may take a while to download the
          model.
        </p>
      </div>
    </div>
  );
}

export default DocQAndAPage;
