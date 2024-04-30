"use client";
import Link from "next/link";
import { useState } from "react";

import { MenuIcon as BurgerIcon, X } from "lucide-react";
import MobileLinks from "./ui/mobileLinks";

// import { signOut, useSession } from 'next-auth/react';


function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  // const { status } = useSession()

  const toggleMenu = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <div className="hover:cursor-pointer relative" onClick={toggleMenu}>
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
        <div className="bg-red-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10">
           <MobileLinks onClick={() => setIsOpen(false)} />

          {status === "authenticated" ? (
            <>
              <Link href="/orders" onClick={() => setIsOpen(false)}>
                Orders
              </Link>
              <button>signOut</button>
            </>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default MobileNav;
