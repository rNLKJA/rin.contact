import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import { BsLinkedin } from "react-icons/bs";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import Typography from "@mui/material/Typography";

const IconRow = () => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <IconButton href="https://github.com/rNLKJA/" target="_blank">
          <AiFillGithub
            color="black"
            style={{ height: "5vh", maxHeight: 30 }}
          />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          href="https://www.linkedin.com/in/rin-huang/"
          target="_blank"
        >
          <BsLinkedin
            color="#001BA0"
            style={{ height: "5vh", maxHeight: 30 }}
          />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton
          href="https://www.instagram.com/chuangyu_hscy/"
          target="_blank"
        >
          <AiFillInstagram
            color="#FF66BF"
            style={{ height: "5vh", maxHeight: 30 }}
          />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton href="mailto:huang@rin.contact">
          <SiGmail color="#1976D2" style={{ height: "5vh", maxHeight: 30 }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

function Footer() {
  return (
    <div className="flex justify-between items-center px-5">
      <div className="flex-grow-0">
        <Typography
          variant="body1"
          align="justify"
          fontFamily="Times New Roman"
          fontSize={14}
        ></Typography>
      </div>
      <div className="flex-grow-0">
        <IconRow />
      </div>
    </div>
  );
}

export default Footer;
