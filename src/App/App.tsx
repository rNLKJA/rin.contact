// import required libraries
import { useEffect, FC } from "react";
import "./App.css";

// import ESSENTIAL Profile component
import Profile from "../profile/Profile";

/**
 * This is the Main function which contains the Profile component and
 * render it as part of App component
 * @returns App
 */
const App: FC = () => {
  useEffect(() => {
    document.title = "Rin";
  }, []);

  return <Profile />;
};

export default App;
