"use client";
import {useState,useEffect} from 'react'
import { useTheme } from "next-themes";
import { MdLightMode,MdDarkMode } from "react-icons/md";

function ThemeSwitcher({isHome, isHomeLarge}:{isHome?:boolean; isHomeLarge?:boolean}) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        }
  return (
    <div className={`absolute ${isHomeLarge&&"hidden"} md:${isHomeLarge&&"block"} ${isHome?"right-20":"right-10"} ${isHome?" ":"top-10"} md:right-10 md:top-10 hover:cursor-pointer`} onClick={handleThemeChange}>{theme==="dark"?<MdLightMode className='text-white' size={28} />:<MdDarkMode size={28} />}</div>
  )
}

export default ThemeSwitcher