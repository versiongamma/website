import { createRoot } from "react-dom/client";

import { App } from "../src/app";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find application container element");
}

const root = createRoot(container);
root.render(<App />);
