import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { Fade } from "react-awesome-reveal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

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
      <Fade triggerOnce duration={1500} direction="down">
        <nav className="space-x-4">
          <Link className="link-hover px-2 mr-4" href="/about-me">
            About Me
          </Link>
          <Link className="link-hover px-2 mr-4" href="/projects">
            Projects
          </Link>
          <Link className="link-hover px-2 mr-4" href="/blogs">
            Blogs
          </Link>
          <Link className="link-hover px-2 mr-4" href="/contact">
            Contact
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
          <Link href="/about-me">About Me</Link>
        </MenuItem>
        <MenuItem onClick={() => setIsOpen(null)}>
          <Link href="/projects">Projects</Link>
        </MenuItem>
        <MenuItem onClick={() => setIsOpen(null)}>
          <Link href="/blogs">Blogs</Link>
        </MenuItem>
        <MenuItem onClick={() => setIsOpen(null)}>
          <Link href="/contact">Contact</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};
