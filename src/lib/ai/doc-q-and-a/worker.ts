import docQAndModel from "@/lib/ai/doc-q-and-a/model.ts";
import { DocumentQuestionAnsweringOutput } from "@huggingface/transformers";

export interface DocQAndAEventMessage {
  image: File;
  question: string;
}

export type DocQAndAWorkerResponse =
  | DocumentQuestionAnsweringOutput
  | DocumentQuestionAnsweringOutput[];

self.onmessage = async (event: MessageEvent<DocQAndAEventMessage>) => {
  try {
    await docQAndModel.createPipeline();
    const output = await docQAndModel.answer(
      URL.createObjectURL(event.data.image),
      event.data.question,
    );
    self.postMessage(output);
  } catch {
    self.postMessage([]);
  }
};
