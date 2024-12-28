import { MODELS_CACHE_NAME } from "@/lib/shared/constants";
import modelDatabase from "@/lib/storage/model-database";
import modelCache from "./model-cache";

const cacheConnector = {
  syncCacheToDatabase: async () => {
    const files = await modelCache.fetchModels();
    await modelDatabase.saveModel(files);
  },
  loadFromDatabase: async () => {
    const files = await modelDatabase.fetchModels();
    const cache = await caches.open(MODELS_CACHE_NAME);
    const cacheKeys = await caches.keys();

    await Promise.all(
      files.map((file) => {
        const foundCache = cacheKeys.find((key) =>
          file.url.toLowerCase().includes(key.toLowerCase()),
        );
        if (foundCache) {
          return;
        }
        const response = new Response(file.content);
        return cache.put(file.url, response);
      }),
    );
  },
};

export type CacheConnector = typeof cacheConnector;

export default cacheConnector;
