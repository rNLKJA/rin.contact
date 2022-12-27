import React from "react";

import external_links from "../../data/external_links";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { Mailto } from "../../hook/Mail";

function ContactIcons() {
  return (
    <CardContent>
      <div className="flex flex-auto justify-around items-evenly">
        {external_links.map((data) => {
          if (data.name !== "Gmail") {
            return (
              <Button
                className="w-1/4 h-1/4"
                onClick={() => window.open(data.link)}
                key={data.name}
              >
                {data.img}
              </Button>
            );
          } else {
            return (
              <Button className="w-1/4 h-1/4" key={data.name}>
                <Mailto
                  email="huang@rin.contact"
                  subject="Build Connection with Rin!"
                  body="Hello! Please write down your message at here!"
                >
                  {data.img}
                </Mailto>
              </Button>
            );
          }
        })}
      </div>
    </CardContent>
  );
}

export default ContactIcons;
