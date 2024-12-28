import modelCache from "@/lib/storage/model-cache";
import { ModelFile } from "@/lib/storage/model-database";
import { useEffect, useState } from "react";

export interface Model {
  name: string;
  files: {
    url: string;
    /**
     * Size in bytes.
     */
    size: number;
  }[];
}

const modelFilesToModels = (files: ModelFile[]): Model[] => {
  const models = new Map<string, Model>();
  for (const file of files) {
    const fileURL = new URL(file.url);
    const modelName = fileURL.pathname.split("/").splice(1, 2).join("/");
    const model = models.get(modelName);
    if (model) {
      model.files.push({
        url: file.url,
        size: file.content.size,
      });
    } else {
      models.set(modelName, {
        name: modelName,
        files: [
          {
            url: file.url,
            size: file.content.size,
          },
        ],
      });
    }
  }
  return Array.from(models.values());
};

export default function useModels() {
  const [models, setModels] = useState<Model[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    modelCache
      .fetchModels()
      .then((files) => {
        setModels(modelFilesToModels(files));
      })
      .catch(setError);
  }, []);

  return { models, error };
}
