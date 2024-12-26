import { assertNonEmpty } from "@/lib/shared/utils";
import cacheConnector from "@/lib/storage/cache-connector";
import {
  DocumentQuestionAnsweringPipeline,
  ImageInput,
  pipeline,
} from "@huggingface/transformers";

let pipelineInstance: DocumentQuestionAnsweringPipeline | undefined;
export const MODEL_NAME = "Xenova/donut-base-finetuned-docvqa";
const docQAndModel = {
  async createPipeline() {
    if (pipelineInstance) {
      return pipelineInstance;
    }
    pipelineInstance = await pipeline(
      "document-question-answering",
      MODEL_NAME,
      {
        device: "webgpu",
      },
    );
    cacheConnector.syncCacheToDatabase();
    return pipelineInstance;
  },

  async answer(image: ImageInput, question: string) {
    assertNonEmpty(pipelineInstance, "Pipeline not created yet.");
    return pipelineInstance(image, question);
  },

  async dispose() {
    pipelineInstance = undefined;
  },
};

export type DocQAndAModel = typeof docQAndModel;

export default docQAndModel;
