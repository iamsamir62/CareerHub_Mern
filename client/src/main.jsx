import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { JobProvider } from "./context/JobContext.jsx";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/sonner.jsx";
import store from "./redux/store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
const customToastStyle = {
  fontSize: "3rem",
  padding: "1rem",
  maxWidth: "400px",
};
const persistor = persistStore(store);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>

      <Toaster />
    </Provider>
  </StrictMode>
);
