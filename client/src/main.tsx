import { createRoot } from "react-dom/client";
import process from "process";
import App from "./App";
import "./index.css";

// Polyfill Node's `process` object for browser bundles so packages like
// `is-wsl` (pulled in via @lanonasis/oauth-client) don't crash when they try
// to read `process.env` or `process.platform`.
if (typeof globalThis.process === "undefined") {
  globalThis.process = process;
} else {
  // Ensure essential fields exist even if another shim is present.
  globalThis.process.env ??= process.env;
}

createRoot(document.getElementById("root")!).render(<App />);
