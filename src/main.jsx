import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Web3ModalProvider } from "./utils/Web3ModalProvider.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Web3ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3ModalProvider>
  </React.StrictMode>
);
