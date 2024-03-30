"use client";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";

function Header({ isOpen,toggle}: { isOpen: boolean; toggle: () => void}) {
  return (
    <header className="text-black bg-transparent  dark:bg-transparent  w-full px-3 py-4 shadow-lg sticky md:hidden">
      <div className="flex justify-between align-middle">
        <Logo isLogo={true}/>
       <div>
        <ThemeSwitcher isHome={true} />
        {!isOpen ? (
          <SlMenu
            className={` w-7 h-7 text-bright-orange dark:text-yellow-green transition-transform duration-700 ease-in-out ${
              isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
            onClick={toggle}
          />
        ) 
        : (
          <VscChromeClose
            className={` w-7 h-7 text-bright-orange dark:text-yellow-green  transition-transform duration-700 ease-in-out ${
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
            onClick={toggle}
          />
        )
        }
        </div>
      </div>
    </header>
  );
}

export default Header;
