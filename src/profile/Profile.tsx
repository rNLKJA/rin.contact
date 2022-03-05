// import required libraries
import React, { FunctionComponent } from "react";
import { Card } from "@mui/material";

// import two main container components
import { BriefProfile } from "../components/BriefProfile";
import { MoreProfile } from "../components/MoreProfile";

// import styles sheets
import "./Styles/Profile.css";

/**
 * This component is the main component of the entire personal profile project,
 * Two components are wrap in a single @mui <Card /> components. You don't have to
 * edit this file if you only want to change the webpage content.
 * @returns <Profile >: React.Component
 */
const Profile: FunctionComponent = () => {
  return (
    <React.Fragment>
      {/* Define the main container */}
      <Card
        className="profile-grid"
        style={{ backgroundColor: "transparent", gridGap: 5 }}
      >
        {/* import BriefProfile component */}
        <div className="briefProfile">
          <BriefProfile />
        </div>

        {/* import MoreProfile component */}
        <div className="moreInfo">
          <div className="moreInfoContainer">
            <MoreProfile />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

// export the React.Component
export default Profile;
