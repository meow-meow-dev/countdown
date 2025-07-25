import { i18n } from "@lingui/core";
import { detect, fromNavigator, fromStorage } from "@lingui/detect-locale";
import { I18nProvider } from "@lingui/react";
import { MantineProvider } from "@mantine/core";

import "./index.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.jsx";
import { loadMessages } from "./loadMessages.js";

let locale = detect(fromStorage("lang"), fromNavigator());
if (locale !== "fr" && locale !== "en") locale = "en";

await loadMessages(locale);

const root = document.getElementById("root");
if (root)
  createRoot(root).render(
    <StrictMode>
      <I18nProvider i18n={i18n}>
        <MantineProvider>
          <ModalsProvider>
            <Notifications />
            <App />
          </ModalsProvider>
        </MantineProvider>
      </I18nProvider>
    </StrictMode>
  );
