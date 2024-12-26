import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import cacheConnector from "./lib/storage/cache-connector.ts";
import Layout from "./components/shared/layout.tsx";

cacheConnector.loadFromDatabase();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <App />
    </Layout>
  </StrictMode>,
);
