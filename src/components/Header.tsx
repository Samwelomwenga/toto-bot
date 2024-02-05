"use client";
import { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <header className="text-black bg-teal-600 h-20 w-full px-3 pt-5 shadow-lg sticky">
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
      {isOpen ? (
        <ul className=" bg-orange-400  w-full h-48 rounded shadow-md animate-fade-in-right">
          <li className="text-2xl font-semibold text-orange-400">Home</li>
          <li className="text-2xl font-semibold text-orange-400">About</li>
          <li className="text-2xl font-semibold text-orange-400">Contact</li>
        </ul>
      ) : null}
    </header>
  );
}

export default Header;
