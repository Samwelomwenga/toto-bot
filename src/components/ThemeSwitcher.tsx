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
    <div className='absolute right-10 top-10' onClick={handleThemeChange}>{theme==="dark"?<MdLightMode size={28} />:<MdDarkMode size={28} />}</div>
  )
}

export default ThemeSwitcher