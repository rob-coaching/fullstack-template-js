import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./data/DataProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // important note:
  // always nested your Context provider INSIDE React Router!
  // this way we can use router features like navigate / redirects inside the Context
  <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>
);
