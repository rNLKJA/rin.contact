import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./pages/Main/App";

import Footer from "./pages/Footer/Footer";

const main = ReactDOM.createRoot(document.getElementById("@rNLKJA-main"));
const footer = ReactDOM.createRoot(document.getElementById("@rNLKJA-footer"));

main.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

footer.render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>,
);
