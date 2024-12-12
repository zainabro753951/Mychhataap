import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider.jsx";
import { SocketProvider } from "./Context/SocketIO.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
);
