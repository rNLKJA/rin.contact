import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { Fade } from "react-awesome-reveal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import WorkIcon from "@mui/icons-material/WorkOutline";
import BookIcon from "@mui/icons-material/BookOutlined";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import HistoryEduIcon from "@mui/icons-material/HistoryEduOutlined";

const Header = () => {
  return (
    <div>
      <DesktopHeader />
      <MobileHeader />
    </div>
  );
};

export default Header;

export const DesktopHeader = () => {
  return (
    <div className="hidden md:flex justify-between items-center py-10 ">
      <Fade triggerOnce duration={1500} direction="down">
        <Link className="flex flex-row items-center" href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={80}
            height={80}
            quality={25}
            layout="fixed"
            priority
          />
          <span className="ml-2 font-bold link-hover">rNLKJA</span>
        </Link>
      </Fade>
      <Fade triggerOnce duration={1500} direction="right">
        <nav className="space-x-4">
          <Link className="link-hover px-2 mr-4" href="/about-me">
            <InfoIcon /> About Me
          </Link>
          <Link className="link-hover px-2 mr-4" href="/projects">
            <WorkIcon /> Projects
          </Link>
          <Link className="link-hover px-2 mr-4" href="/blogs">
            <BookIcon /> Blogs
          </Link>
          <Link className="link-hover px-2 mr-4" href="/data-science">
            <HistoryEduIcon /> DS Study
          </Link>
          <Link className="link-hover px-2 mr-4" href="/contact">
            <EmailIcon /> Contact
          </Link>
        </nav>
      </Fade>
    </div>
  );
};

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = React.useState(null);

  const toggleDropdown = (event) => {
    if (isOpen) {
      setIsOpen(null);
    } else {
      setIsOpen(event.currentTarget);
    }
  };

  return (
    <div className="md:hidden flex justify-between items-center py-4">
      <Link className="flex flex-row items-center" href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={80}
          height={80}
          quality={25}
          layout="fixed"
          priority
        />
        <span className="ml-2 font-bold">rNLKJA</span>
      </Link>

      <IconButton onClick={toggleDropdown} className="px-2">
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={isOpen}
        keepMounted
        open={Boolean(isOpen)}
        onClose={() => setIsOpen(null)}
      >
        <MenuItem onClick={() => setIsOpen(null)}>
          <Link href="/about-me">
            <InfoIcon /> About Me
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setIsOpen(null)}>
          <Link href="/projects">
            <WorkIcon /> Projects
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setIsOpen(null)}>
          <Link href="/blogs">
            <BookIcon /> Blogs
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setIsOpen(null)}>
          <Link href="/data-science">
            <BookIcon /> DS Study
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setIsOpen(null)}>
          <Link href="/contact">
            <EmailIcon /> Contact
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};
