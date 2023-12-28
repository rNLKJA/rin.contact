import React from "react";
import Link from "next/link";
import Image from "next/image";

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
      <Link href="/" className="flex flex-row items-center">
        <Image src="/logo.svg" alt="Logo" width={80} height={80} />
        <span className="ml-2 font-bold">rNLKJA</span>
      </Link>

      <nav className="hidden md:flex space-x-4">
        <Link href="/about-me" className="px-2 mr-4">
          About Me
        </Link>
        <Link href="/projects" className="px-2 mr-4">
          Projects
        </Link>
        <Link href="/blogs" className="px-2 mr-4">
          Blogs
        </Link>
        <Link href="/contact" className="px-2 mr-4">
          Contact
        </Link>
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
      <Link href="/" className="flex flex-row items-center">
        <Image src="/logo.svg" alt="Logo" width={80} height={80} />
        <span className="ml-2 font-bold">rNLKJA</span>
      </Link>

      <button onClick={toggleDropdown} className="md:hidden px-2">
        Menu
      </button>
      {isOpen && (
        <div className="absolute top-16 right-0 bg-white shadow-md z-10">
          <Link href="/about-me" className="block px-4 py-2">
            About Me
          </Link>
          <Link href="/projects" className="block px-4 py-2">
            Projects
          </Link>
          <Link href="/blogs" className="block px-4 py-2">
            Blogs
          </Link>
          <Link href="/contact" className="block px-4 py-2">
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};
