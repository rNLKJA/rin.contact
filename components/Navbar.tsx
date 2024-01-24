"use client";
import React, { useState, useEffect } from "react";
import { NavLogoContainer } from "./nav/NavLogoContainer";
import { NavLinkContainer } from "./nav/NavLinkContainer";
import MenuIcon from "@mui/icons-material/MenuRounded";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex-center w-full border-b-2 py-4">
      <div className="flex-between mx-auto w-full max-w-screen-2xl">
        <div className="pl-8">
          <NavLogoContainer />
        </div>
        {isClient && (
          <>
            <div className="hidden lg:flex pr-8">
              <NavLinkContainer />
            </div>
            <div className="lg:hidden pr-8">
              <MenuIcon onClick={() => setIsMenuOpen(true)} />
            </div>
            {isMenuOpen && (
              <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
                <button
                  className="absolute top-5 right-5 text-3xl text-red-400 font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  X
                </button>
                <NavLinkContainer />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
