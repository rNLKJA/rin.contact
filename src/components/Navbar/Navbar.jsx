import React, { useState } from "react";
import { Link } from "react-router-dom";
import navData from "../../data/nav";
import { RiHome2Line } from "react-icons/ri";
import Button from "@mui/material/Button";
import { AiOutlineTranslation } from "react-icons/ai";

import { MdOutlineMenu } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";

import "./Navbar.css";

const NavLink = ({ data, t }) => {
  return (
    <Button variant="outline">
      <Link to={data.link} className="nav-link-item">
        <div className="flex justify-evenly link-items items-center">
          {data.img}
          <p
            className="tracking-widest text-xm p-2"
            style={{ fontFamily: "DotGothic16" }}
          >
            {t(data.name)}
          </p>
        </div>
      </Link>
    </Button>
  );
};

const NavbarDesktop = ({ t, lng, changeLanguage }) => {
  return (
    <div
      className="max-w-min md:min-w-max flex justify-between component-container navbar"
      // style={{ width: 1920 * 0.85 }}
    >
      <div className="min-h-navMin md:min-h-navMax flex justify-center items-center">
        <Button variant="outline">
          <Link to="/">
            <RiHome2Line size={30} />
          </Link>
        </Button>
      </div>

      <div className="min-h-navMin  md:min-h-navMax flex justify-end items-center">
        {navData.map((data, index) => {
          return <NavLink key={"nav-" + index + data.name} data={data} t={t} />;
        })}

        <Button
          onClick={() => {
            changeLanguage(lng);
            console.log(lng);
          }}
          variant="outline"
        >
          <AiOutlineTranslation size={30} className="nav-icons" />
          <span>{t("CHANGE_LANG")}</span>
        </Button>
      </div>
    </div>
  );
};

const NavbarDropdownMenu = ({ setOpen, t, lng, changeLanguage }) => {
  return (
    <div className="flex flex-col justify-center items-center nav-mobile-dropdown">
      <div
        className="flex flex-col items-start space-y-4"
        style={{ color: "#115ca7" }}
      >
        {navData.map((data, index) => {
          return <NavLink key={"nav-" + index + data.name} data={data} t={t} />;
        })}

        <Button
          variant="outline"
          onClick={() => {
            changeLanguage(lng);
          }}
        >
          <a className="nav-link-item">
            <div className="flex justify-evenly link-items items-center">
              <AiOutlineTranslation size={30} className="nav-icons" />
              <p
                className="tracking-widest text-xm p-2"
                style={{ fontFamily: "DotGothic16" }}
              >
                {t("CHANGE_LANG")}
              </p>
            </div>
          </a>
        </Button>
      </div>

      <Button
        onClick={() => {
          setOpen(false);
        }}
        style={{ margin: "1rem" }}
      >
        <GrFormClose size={30} variant="outline" />
      </Button>
    </div>
  );
};

const NavbarMobileMenu = ({ setOpen }) => {
  return (
    <div className="flex flex-col items-end">
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        <MdOutlineMenu size={30} variant="outline" />
      </Button>
    </div>
  );
};

const NavbarMobile = ({ t, lng, changeLanguage }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-mobile">
      {open ? (
        <NavbarDropdownMenu
          setOpen={setOpen}
          t={t}
          lng={lng}
          changeLanguage={changeLanguage}
        />
      ) : (
        <NavbarMobileMenu setOpen={setOpen} />
      )}
    </div>
  );
};

function Navbar({ t, lng, changeLanguage }) {
  if (window.innerWidth >= 1200) {
    return <NavbarDesktop t={t} lng={lng} changeLanguage={changeLanguage} />;
  } else {
    return <NavbarMobile t={t} lng={lng} changeLanguage={changeLanguage} />;
  }
}

export default Navbar;
