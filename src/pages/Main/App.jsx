import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import "./App.css";

// import HomePage from "../../components/Home/HomePage";
import Home from "../Home/Home";
import i18n from "../../locales/core/i18n";
import "../../locales/core/i18n";
import { useTranslation } from "react-i18next";

function App() {
  const [lng, setLng] = useState("en");
  const changeLanguage = (lng) => {
    lng === "en" ? setLng("zh") : setLng("en");
    i18n.changeLanguage(lng);
  };
  const { t } = useTranslation();

  return (
    <div className="w-screen flex flex-col items-center">
      <Router>
        <Navbar t={t} lng={lng} changeLanguage={changeLanguage} />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/" element={<></>}></Route> */}
          <Route exact path="/about" element={<>About</>}></Route>
          <Route exact path="/skills" element={<>Skills</>}></Route>
          <Route
            exact
            path="/qualification"
            element={<>Qualification</>}
          ></Route>
          <Route exact path="/work" element={<>Work</>}></Route>
          <Route exact path="/projects" element={<>Projects</>}></Route>
          <Route exact path="/contact" element={<>Contact</>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
