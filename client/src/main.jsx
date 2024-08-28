import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { JobProvider } from "./context/JobContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <JobProvider>
      <App />
    </JobProvider>
  </StrictMode>
);
