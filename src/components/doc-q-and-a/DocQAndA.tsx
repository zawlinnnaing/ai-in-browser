import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import styles from "./DocQAndA.module.css";

import { DocQAndAWorkerResponse } from "@/lib/ai/doc-q-and-a/worker";
import DocQAndAWorker from "@/lib/ai/doc-q-and-a/worker?worker";

export default function DocQAndA() {
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const worker = useRef<Worker | null>(null);

  useEffect(() => {
    worker.current = new DocQAndAWorker();
    const handleMessageReceived = (
      event: MessageEvent<DocQAndAWorkerResponse>,
    ) => {
      const output = event.data;
      setProcessing(false);
      setAnswers(
        output.flatMap((ans) => {
          if ("answer" in ans) {
            return ans.answer;
          }
          return ans.flatMap((a) => a.answer);
        }),
      );
    };
    worker.current.addEventListener("message", handleMessageReceived);
    return () => {
      worker.current?.removeEventListener("message", handleMessageReceived);
    };
  }, []);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    setDocumentFile(file ?? null);
  };

  const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleAnswer = async () => {
    if (!documentFile || !question) {
      return;
    }
    setProcessing(true);
    worker.current?.postMessage({ image: documentFile, question });
  };

  return (
    <div className="flex w-full gap-4">
      <div className={styles.section}>
        <h3>Ask a Question</h3>
        <div className={styles.control}>
          <Label htmlFor="image-upload">Upload image</Label>
          <Input
            id="image-upload"
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className={styles.control}>
          <Label htmlFor="question">Question</Label>
          <Input id="question" type="text" onChange={handleQuestionChange} />
        </div>
        <Button
          disabled={!documentFile || !question || processing}
          onClick={handleAnswer}
        >
          {processing ? "Answering..." : "Ask a question"}
        </Button>
      </div>
      <div className={styles.section}>
        <h3>Answers</h3>
        {answers.length ? (
          <div>
            {answers.map((answer, index) => {
              return <p key={index}>{answer}</p>;
            })}
          </div>
        ) : (
          <div>
            <p>No answers yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
