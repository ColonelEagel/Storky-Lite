"use client";
import { useState } from "react";

import { MenuIcon as BurgerIcon, X } from "lucide-react";
import MobileLinks from "./ui/mobileLinks";


function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="md:hidden">
      <div className="hover:cursor-pointer relative z-30" onClick={toggleMenu}>
        <X
          className={`transition-opacity duration-300 absolute right-0 top-0 translate-y-[-50%] ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <BurgerIcon
          className={`transition-opacity duration-300 absolute right-0 top-0 translate-y-[-50%] ${
            !isOpen ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      {isOpen && (
        <div
          className=" bg-[#a3a3a3] text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10"
          style={{
            boxShadow: "0 4px 30px #000000191)",
          }}
        >
          <MobileLinks onClick={toggleMenu}/>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
