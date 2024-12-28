import PageLayout from "@/components/shared/PageLayout";
import useModels from "@/hooks/useModels";

export default function ModelsManagementPage() {
  const { models } = useModels();
  console.log("🚀 ~ ModelsManagementPage ~ models:", models);

  return (
    <PageLayout
      title="Models Management"
      description="Download and delete the models used in the application."
    >
      <h2 className="text-xl">Available models</h2>
    </PageLayout>
  );
}
