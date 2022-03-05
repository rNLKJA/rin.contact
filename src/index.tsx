import React from "react";
import ReactDOM from "react-dom";
import "./Styles/index.css";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import skyBg from "./img/skysBg2.jpg";

ReactDOM.render(
  <React.StrictMode>
    <img className="app-Bg" src={skyBg} alt="galaxy background" />;
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
