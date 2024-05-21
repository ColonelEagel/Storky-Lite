"use client";
import { useState } from "react";

import { MenuIcon as BurgerIcon, X } from "lucide-react";
import MobileLinks from "./ui/mobileLinks";

/**
 * MobileNav Component
 *
 * This component renders the mobile navigation menu.
 * It includes a burger icon and a list of links.
 * The menu can be toggled by clicking on the burger icon.
 */
function MobileNav() {
  // State to track the open/closed state of the menu
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggle the menu open/closed state.
   */
  const toggleMenu = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="md:hidden">
      {/* Burger icon */}
      <div className="hover:cursor-pointer relative z-30" onClick={toggleMenu}>
        {/* Cross icon that appears when the menu is open */}
        <X
          className={`transition-opacity duration-300 absolute right-0 top-0 translate-y-[-50%] ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Burger icon that appears when the menu is closed */}
        <BurgerIcon
          className={`transition-opacity duration-300 absolute right-0 top-0 translate-y-[-50%] ${
            !isOpen ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      {/* The menu that appears when the burger icon is clicked */}
      {isOpen && (
        <div
          className="bg-[#a3a3a3] text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10"
          style={{
            boxShadow: "0 4px 30px #000000191)",
          }}
        >
          {/* The list of links */}
          <MobileLinks onClick={toggleMenu} />
        </div>
      )}
    </div>
  );
}

export default MobileNav;

