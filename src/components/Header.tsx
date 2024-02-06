"use client";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
// import Menu from "./Menu";
function Header({ isOpen, toggle}:{isOpen: boolean, toggle: () => void}) {
 
  return (
    <header className="text-black bg-teal-600 h-12 w-full px-3 py-5 shadow-lg sticky md:hidden">
      <div className="flex justify-between mb-8">
        <p className="text-2xl font-semibold text-orange-400">TOTO BOT</p>
        {!isOpen ? (
          <SlMenu
          className={` w-7 h-7 text-orange-400 transition-transform duration-700 ease-in-out ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
          onClick={toggle}
          />
          ) : (
            <VscChromeClose
            className={` w-7 h-7 text-orange-400  transition-transform duration-700 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            onClick={toggle}
            />
            )}
      </div>
      
    </header>
  );
}

export default Header;
