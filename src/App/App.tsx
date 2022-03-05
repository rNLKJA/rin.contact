// import required libraries
import { useEffect, FC } from "react";

// import ESSENTIAL Profile component
import Profile from "../profile/Profile";

// import css stylesheet
import "./App.css";

// config dotenv which enable the react program read parameters from .env file
require("dotenv").config();

/**
 * This is the Main function which contains the Profile component and
 * render it as part of App component
 * @returns App
 */
const App: FC = () => {
  const profileTitle: string = "Rin Huang"; // change your page title at here!

  useEffect(() => {
    document.title = profileTitle;
  }, []);

  return <Profile />;
};

export default App;
