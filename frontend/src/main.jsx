import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./context/AuthContext.jsx";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
