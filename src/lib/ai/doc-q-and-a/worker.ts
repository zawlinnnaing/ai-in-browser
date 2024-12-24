import docQAndModel from "@/lib/ai/doc-q-and-a/model.ts";
import { DocumentQuestionAnsweringOutput } from "@huggingface/transformers";

export interface DocQAndAEventMessage {
  image: File;
  question: string;
}

export type DocQAndAWorkerSuccessResponse = {
  type: "success";
  data: DocumentQuestionAnsweringOutput | DocumentQuestionAnsweringOutput[];
};

export type DocQAndAWorkerErrorResponse = {
  type: "error";
  data: unknown;
};

export type DocQAndAWorkerResponse =
  | DocQAndAWorkerSuccessResponse
  | DocQAndAWorkerErrorResponse;

self.onmessage = async (event: MessageEvent<DocQAndAEventMessage>) => {
  try {
    await docQAndModel.createPipeline();
    const output = await docQAndModel.answer(
      URL.createObjectURL(event.data.image),
      event.data.question,
    );
    self.postMessage({
      type: "success",
      data: output,
    });
  } catch (error) {
    self.postMessage({
      type: "error",
      data: error,
    });
  }
};
