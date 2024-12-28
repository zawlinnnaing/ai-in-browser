import { MODELS_CACHE_NAME } from "../shared/constants";
import { ModelFile } from "./model-database";

const modelCache = {
  fetchModels: async (): Promise<ModelFile[]> => {
    const cache = await caches.open(MODELS_CACHE_NAME);
    const keys = await cache.keys();
    const files: ModelFile[] = [];
    await Promise.all(
      keys.map(async (request) => {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          files.push({
            url: request.url,
            content: blob,
          });
        }
      }),
    );
    return files;
  },
};

export default modelCache;
