import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/shared/Layout.tsx";
import "./index.css";
import cacheConnector from "./lib/storage/cache-connector.ts";
import DocQAndAPage from "./pages/DocQAndAPage.tsx";
import ModelsManagementPage from "./pages/ModelsManagementPage.tsx";

cacheConnector.loadFromDatabase();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DocQAndAPage />} />
          <Route path="/doc-q-and-a" element={<DocQAndAPage />} />
          <Route path="/settings">
            <Route
              path="models-management"
              element={<ModelsManagementPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
