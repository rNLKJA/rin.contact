// import required libraries
import React, { useEffect, FC } from "react";
import "./App.css";

import Profile from "./profile/Profile";

const App: FC = () => {
  useEffect(() => {
    document.title = "Rin";
  }, []);

  return <Profile />;
};

export default App;
