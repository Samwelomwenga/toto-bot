"use client";
import { useState } from "react";
import Profile from "./Profile";
import CreateChat from "./CreateChat";
import { supabase } from "@/app/utils/supabase";

type MenuProps = {
  isOpen: boolean;
  children: React.ReactNode;
};
function Menu({ isOpen, children }: MenuProps) {
  const [userName, setUserName] = useState<string>("");

  const getUserName = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if(session){
    const userName: string = session.user.user_metadata.user_name
      ??session.user.user_metadata.full_name;
      setUserName(userName);
    }
  };
  getUserName();
  return (
    
      <aside
        className={` bg-gray-600 dark:bg-blue-charcoal text-white  bg-contain w-[17rem] fixed top-0  left-0 md:static h-48 rounded md:w-64  md:rounded-none shadow-md animate-fade-in-right  m-h-svh md:h-full ${
          isOpen ? "block" : "hidden"
        } md:block w-5/6 min-h-screen z-20`}
      >
        <CreateChat />
        {children}

        {userName ? <Profile userName={userName} /> : null}
      </aside>
  
  );
}

export default Menu;
