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
    const userName: string = session
      ? session.user.user_metadata.user_name
      : "Anonymous User";
    setUserName(userName);
  };
  getUserName();
  return (
    <>
      <aside
        className={` bg-black bg-contain fixed top-0  left-0 md:static h-48 rounded  md:rounded-none shadow-md animate-fade-in-right  m-h-svh md:h-full ${
          isOpen ? "block" : "hidden"
        } md:block w-5/6 min-h-screen z-20`}
      >
        <CreateChat />
        {children}

        {userName ? <Profile userName={userName} /> : null}
      </aside>
    </>
  );
}

export default Menu;
