// import required libraries
import React, { FunctionComponent } from "react";
import { List, ListItem } from "@mui/material";

// import certificates array variable
import { certificates, certificate } from "../data/certificates";

/**
 * This components will include all certificates you have earned as a display window.
 * For edit certificates list, adding or delete please edit the file locate at
 *                             ./src/data/cerfificates.ts file
 * @returns Certificates<FunctionComponent>
 */
const Certificates: FunctionComponent = () => {
  // define the global styles for certificates component
  const certificateStyle = {
    justifyContent: "space-between",
    width: "95%",
    display: "flex",
    fontSize: 12,
    color: "#fff9",
  };

  // define the certs issue date style
  const dateTimeStyle = {
    width: 100,
    fontSize: 12,
  };

  const certList1 = certificates.slice(0, 3);
  const certList2 = certificates.slice(3, 6);

  return (
    <React.Fragment>
      <div className="cert-container">
        <List className="cert-div">
          {certList1.map((cert: certificate) => {
            return (
              <ListItem key={cert.title}>
                <div
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <a
                    href={cert.authLink}
                    style={{
                      color: "#f8f8f2",
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    {cert.title}
                  </a>{" "}
                  <div style={dateTimeStyle}>
                    <p className="dateTimeStyle">{cert.issueDate}</p>
                  </div>
                </div>
              </ListItem>
            );
          })}
        </List>

        <List className="cert-div">
          {certList2.map((cert: certificate) => {
            return (
              <ListItem key={cert.title}>
                <div
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <a
                    href={cert.authLink}
                    style={{
                      color: "#f8f8f2",
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    {cert.title}
                  </a>{" "}
                  <div style={dateTimeStyle}>
                    <p className="dateTimeStyle">{cert.issueDate}</p>
                  </div>
                </div>
              </ListItem>
            );
          })}
        </List>
      </div>
    </React.Fragment>
  );
};

// export React.Component
export default Certificates;
