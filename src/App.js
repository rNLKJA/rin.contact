// import required libraries
import React, { useEffect } from "react";
import "./App.css";
import { motion } from "framer-motion";

import Profile from "./profile/profile.jsx";

function App() {
  useEffect(() => {
    document.title = "Rin";
  }, []);
  return (
    <motion.div
      className="App"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0.1 }}
      transition={{ duration: 2 }}
    >
      <Profile />
    </motion.div>
  );
}

export default App;
