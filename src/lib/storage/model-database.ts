import { DB_NAME } from "../shared/constants";

export interface ModelFile {
  url: string;
  content: Blob;
}

export class ModelDatabase {
  private readonly STORE_NAME = "models";

  private readonly version = 1;
  constructor(private readonly name: string) {}

  public readonly initDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.name, this.version);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: "url" });
        }
      };
      request.onerror = () => {
        reject(request.error);
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  };

  public readonly saveModel = async (files: ModelFile[]): Promise<void> => {
    const database = await this.initDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(this.STORE_NAME, "readwrite");
      const store = transaction.objectStore(this.STORE_NAME);
      for (const file of files) {
        store.put({
          url: file.url,
          content: file.content,
        });
      }
      transaction.oncomplete = () => {
        resolve(undefined);
      };
      transaction.onerror = (event) => {
        reject(event);
      };
    });
  };

  public readonly fetchModels = async (): Promise<ModelFile[]> => {
    const database = await this.initDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(this.STORE_NAME, "readonly");
      const store = transaction.objectStore(this.STORE_NAME);
      const request: IDBRequest<ModelFile[]> = store.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  };

  public readonly deleteModelFiles = async (
    urls: string[],
  ): Promise<void> => {
    const database = await this.initDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(this.STORE_NAME, "readwrite");
      const store = transaction.objectStore(this.STORE_NAME);
      for (const url of urls) {
        store.delete(url);
      }
      transaction.oncomplete = () => {
        resolve(undefined);
      };
      transaction.onerror = (event) => {
        reject(event);
      };
    });
  };
}

const modelDatabase = new ModelDatabase(DB_NAME);

export default modelDatabase;
