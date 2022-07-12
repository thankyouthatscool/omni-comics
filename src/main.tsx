import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { GlobalTheme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalTheme />
    <App />
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
