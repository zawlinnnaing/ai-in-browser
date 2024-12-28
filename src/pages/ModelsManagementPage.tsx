import ModelItem from "@/components/models-management/ModelItem";
import PageLayout from "@/components/shared/PageLayout";
import useModels, { Model } from "@/hooks/useModels";
import modelCache from "@/lib/storage/model-cache";
import modelDatabase from "@/lib/storage/model-database";

export default function ModelsManagementPage() {
  const { models, refetch } = useModels();

  const handleDelete = async (model: Model) => {
    const fileURLs = model.files.map((file) => file.url);
    await modelCache.deleteModelFiles(fileURLs);
    await modelDatabase.deleteModelFiles(fileURLs);
    await refetch();
  };

  return (
    <PageLayout
      title="Models Management"
      description="Download and delete the models used in the application."
    >
      <div className="space-y-6">
        <h2 className="text-xl">Available models</h2>
        <div className="space-y-4">
          {models.map((model) => {
            return (
              <ModelItem
                key={model.name}
                model={model}
                onDelete={() => handleDelete(model)}
              />
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
