"use client";
import {useState,useEffect} from 'react'
import { useTheme } from "next-themes";
import { MdLightMode,MdDarkMode } from "react-icons/md";

function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        }
  return (
    <div className='absolute right-20 md:right-10 md:top-10 hover:cursor-pointer' onClick={handleThemeChange}>{theme==="dark"?<MdLightMode className='text-white' size={28} />:<MdDarkMode size={28} />}</div>
  )
}

export default ThemeSwitcher