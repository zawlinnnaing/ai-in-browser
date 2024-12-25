import "./App.css";
import DocQAndA from "./components/doc-q-and-a/DocQAndA";

function App() {
  return (
    <div className="py-4 max-w-screen-lg mx-auto space-y-4">
      <div className="space-y-2">
        <h1 className="text-center">ML models in browser</h1>
        <p className="text-center">
          Powered by{" "}
          <a href="https://huggingface.co/docs/transformers.js/en/index">
            Transformers.js
          </a>
          .
        </p>
      </div>
      <div className="space-y-4">
        <DocQAndA />
        <p className="text-sm text-muted-foreground text-center">
          If this is first time running, it may take a while to download the
          model.
        </p>
      </div>
    </div>
  );
}

export default App;
