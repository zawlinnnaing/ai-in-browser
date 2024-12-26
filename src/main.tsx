import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DocQAndAPage from "./pages/DocQAndAPage.tsx";
import "./index.css";
import cacheConnector from "./lib/storage/cache-connector.ts";
import Layout from "./components/shared/layout.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import SettingsPage from "./pages/SettingsPage.tsx";

cacheConnector.loadFromDatabase();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DocQAndAPage />} />
          <Route path="/doc-q-and-a" element={<DocQAndAPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
