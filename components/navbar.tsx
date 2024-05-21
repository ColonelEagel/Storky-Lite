import Link from "next/link";

import { ThemeToggle } from "@/components/ui/themeToggle";
import Logo from "@/components/ui/logo";
import MobileNav from "./mobileNav"; 
import NavLinks from "./ui/navLinks";
import LoginButton from "./ui/loginButton";

/**
 * Navbar component
 *
 * This component renders the main navbar of the application.
 * It includes the logo, navigation links, mobile menu, and theme toggle.
 */
const Navbar = () => {
  return (
    <div
      className="h-20 sticky  z-50  top-0 text-black p-4 
        flex justify-between items-center border-b-2 uppercase md:h-24 lg:px-20 xl:px-30
          dark:text-white filter backdrop-blur-2xl w-full"
    >
      {/* Logo */}
      <Logo className="mr-auto" />
      
      {/* Navigation links and mobile menu */}
      <div className="flex items-center gap-2 justify-between ">
        <div className="hidden md:flex gap-4 items-center justify-end flex-1">
          {/* Navigation links */}
          <NavLinks />
          {/* Login button */}
          <LoginButton />
        </div>
        {/* Mobile menu */}
        <MobileNav />
        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;

