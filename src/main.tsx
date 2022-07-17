import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import App from "./App";
import { store } from "./store";
import { GlobalTheme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <GlobalTheme />
      <App />
    </ReduxProvider>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
