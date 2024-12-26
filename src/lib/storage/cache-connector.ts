import { MODELS_CACHE_NAME } from "@/lib/shared/constants";
import modelDatabase, { ModelFile } from "@/lib/storage/model-databse";

const cacheConnector = {
  syncCacheToDatabase: async () => {
    const cache = await caches.open(MODELS_CACHE_NAME);
    const keys = await cache.keys();
    const files: ModelFile[] = [];
    await Promise.all(
      keys.map(async (request) => {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          files.push({
            name: request.url,
            content: blob,
          });
        }
      }),
    );
    await modelDatabase.saveModel(files);
  },
  loadFromDatabase: async () => {
    const files = await modelDatabase.loadModel();
    const cache = await caches.open(MODELS_CACHE_NAME);
    const cacheKeys = await caches.keys();

    await Promise.all(
      files.map((file) => {
        const foundCache = cacheKeys.find((key) =>
          file.name.toLowerCase().includes(key.toLowerCase()),
        );
        if (foundCache) {
          return;
        }
        const response = new Response(file.content);
        return cache.put(file.name, response);
      }),
    );
  },
};

export type CacheConnector = typeof cacheConnector;

export default cacheConnector;
