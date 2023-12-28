import React from "react";

const Header = () => {
  const [isMobile, setIsMobile] = React.useState(undefined);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile === undefined) return null;

  return <>{isMobile ? <MobileHeader /> : <DesktopHeader />}</>;
};

export default Header;

export const DesktopHeader = () => {
  return (
    <div className="flex justify-between items-center py-10 px-4">
      <a href="/" className="flex flex-row items-center">
        <img
          src="/logo.svg"
          alt="Logo"
          className="logo"
          style={{ width: "50px" }}
        />
        <span className="ml-2 font-bold">rNLKJA</span>{" "}
      </a>

      <nav className="hidden md:flex space-x-4">
        <a href="/about-me" className="px-2 mr-4">
          About Me
        </a>
        <a href="/projects" className="px-2 mr-4">
          Projects
        </a>
        <a href="/blogs" className="px-2 mr-4">
          Blogs
        </a>
        <a href="/contact" className="px-2">
          Contact
        </a>
      </nav>
    </div>
  );
};

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center p-4">
      <a href="/" className="flex flex-row items-center">
        <img src="/logo.svg" alt="Logo" style={{ width: "50px" }} />
        <span className="ml-2 font-bold">rNLKJA</span>{" "}
      </a>

      <button onClick={toggleDropdown} className="md:hidden px-2">
        Menu
      </button>
      {isOpen && (
        <div className="absolute top-16 right-0 bg-white shadow-md z-10">
          <a href="/about-me" className="block px-4 py-2">
            About Me
          </a>
          <a href="/projects" className="block px-4 py-2">
            Projects
          </a>
          <a href="/blogs" className="block px-4 py-2">
            Blogs
          </a>
          <a href="/contact" className="block px-4 py-2">
            Contact
          </a>
        </div>
      )}
    </div>
  );
};
