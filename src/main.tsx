import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";
import { Analytics } from "@vercel/analytics/react";
import {BrowserRouter} from "react-router-dom";
import { RoutesMain } from "./routes/RoutesMain.tsx";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <I18nextProvider i18n={i18n}>
        <Analytics />
        <BrowserRouter>
          <RoutesMain />
        </BrowserRouter>
      </I18nextProvider>
    </QueryClientProvider>
  </StrictMode>
);
