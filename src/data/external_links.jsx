import { AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { SiGmail } from "react-icons/si";

const image_size = 50;

const external_links = [
  {
    name: "Linkedin",
    img: <AiFillLinkedin size={image_size} />,
    link: "https://www.linkedin.com/in/chuangyu-hscy",
  },
  {
    name: "Instagram",
    img: <AiFillInstagram size={image_size} />,
    link: "https://www.instagram.com/chuangyu_hscy/",
  },
  {
    name: "Github",
    img: <AiFillGithub size={image_size} />,
    link: "https://github.com/rNLKJA",
  },
  { name: "Gmail", img: <SiGmail size={image_size} />, link: "" },
];

export default external_links;
