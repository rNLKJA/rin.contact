import { BsInfoSquare } from "react-icons/bs";
import { MdOutlineSchool, MdWorkOutline } from "react-icons/md";
import {
  RiProjectorLine,
  RiToolsLine,
  RiContactsBookLine,
} from "react-icons/ri";
// import { TiContacts } from "react-icons/ti";

const imgSize = 30;

const navData = [
  {
    link: "/about",
    img: <BsInfoSquare className="nav-icons" size={imgSize} />,
    name: "About",
  },
  {
    link: "/skills",
    img: <RiToolsLine className="nav-icons" size={imgSize} />,
    name: "Skills",
  },
  {
    link: "/qualification",
    img: <MdOutlineSchool className="nav-icons" size={imgSize} />,
    name: "Qualification",
  },
  {
    link: "/work",
    img: <MdWorkOutline className="nav-icons" size={imgSize} />,
    name: "Work",
  },
  {
    link: "/projects",
    img: <RiProjectorLine className="nav-icons" size={imgSize} />,
    name: "Projects",
  },
  {
    link: "/contact",
    img: <RiContactsBookLine className="nav-icons" size={imgSize} />,
    name: "Contact",
  },
];

export default navData;
