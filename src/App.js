// import required libraries
import React, { useEffect } from "react";
import "./App.css";

import Profile from "./profile/profile.jsx";

function App() {
  useEffect(() => {
    document.title = "Rin";
  }, []);
  return (
    <div className="App">
      <Profile />
    </div>
  );
}

export default App;
