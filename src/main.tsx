import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { ListProvider } from "./context/list.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ListProvider>
      <App />
    </ListProvider>
  </StrictMode>
);
