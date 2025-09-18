import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/global.css";

import App from "./App.jsx";
import { PaletteProvider } from "./context/PaletteProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PaletteProvider>
      <App />
    </PaletteProvider>
  </StrictMode>
);
