

import Logo from "@/components/ui/logo"
import MobileNav from "@/components/mobileNav";
import NavLinks from "@/components/ui/navLinks";


function Navbar() {
    // const [open, setOpen] = useState(false);
    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center z-50">
            {/* Logo */}
           
            <div className="w-19/12 flex items-center">
            <Logo  />
            </div>
            <div className="w-9/12 flex justify-end items-center">
            {/* Mobile Menu */}
            <div className="md:hidden">
                <MobileNav  />
            </div>
                {/* <div
                    className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <span
                        className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""
                            }`}
                    />
                    <span
                        className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"
                            }`}
                    />
                    <span
                        className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""
                            }`}
                    />
                </div> */}

                <div className="hidden md:flex ml-10 space-x-8">
                    <NavLinks  />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
