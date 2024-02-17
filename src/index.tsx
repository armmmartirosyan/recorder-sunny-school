import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import MediaProvider from "./app/providers/provider-components/MediaProvider";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <MediaProvider>
    <App />
  </MediaProvider>
);
