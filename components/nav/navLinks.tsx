import React from "react";
import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";
import WorkIcon from "@mui/icons-material/WorkOutline";
import BookIcon from "@mui/icons-material/BookOutlined";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import { NavLink } from "./NavLink";

export const navLinks: NavLink[] = [
  {
    href: "/about",
    icon: <FaceRetouchingNaturalOutlinedIcon />,
    label: "About",
  },
  { href: "/project", icon: <WorkIcon />, label: "Project" },
  { href: "/blog", icon: <BookIcon />, label: "Blog" },
  { href: "/contact", icon: <EmailIcon />, label: "Contact" },
];
