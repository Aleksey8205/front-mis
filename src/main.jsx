import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import store from "./utils/store.js"
import { Provider } from "react-redux"

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
