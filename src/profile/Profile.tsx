import React, { FC } from "react";

import { Card } from "@mui/material";

import { BriefProfile } from "../components/BriefProfile";
import { MoreProfile } from "../components/MoreProfile";

import "./Styles/Profile.css";

/* main component */
const Profile: FC = () => {
  return (
    <React.Fragment>
      <Card
        className="profile-grid"
        style={{ backgroundColor: "transparent", gridGap: 5 }}
      >
        <div className="briefProfile">
          <BriefProfile />
        </div>

        <div className="moreInfo">
          <div className="moreInfoContainer">
            <MoreProfile />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Profile;
