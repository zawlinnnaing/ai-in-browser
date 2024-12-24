import { assertNonEmpty } from "@/lib/utils";
import {
  DocumentQuestionAnsweringPipeline,
  ImageInput,
  pipeline,
} from "@huggingface/transformers";

let pipelineInstance: DocumentQuestionAnsweringPipeline | undefined;

const docQAndModel = {
  async createPipeline() {
    if (pipelineInstance) {
      return pipelineInstance;
    }
    pipelineInstance = await pipeline(
      "document-question-answering",
      "Xenova/donut-base-finetuned-docvqa",
      {
        device: "webgpu",
      },
    );
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
