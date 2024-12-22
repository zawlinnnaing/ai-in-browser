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
      <div>
        <DocQAndA />
      </div>
    </div>
  );
}

export default App;
