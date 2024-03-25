"use client";
import { useState } from "react";
import getInitials from "@/app/utils/functions/getInitials";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
type ProfileProps = {
  userName: string;
};
function Profile({ userName }:ProfileProps) {
  const [isShown, setIsShown] = useState(false);

 const  handleProfileClick=()=>{
    setIsShown(!isShown)
  }
  return (
    <div className="fixed bottom-4 left-4 w-60" onClick={handleProfileClick}>
      {isShown?<LogOut />:null}
      <div className={`flex gap-3 align-middle w-full pl-3   md:pl-4 md:pr-8 py-2 ${isShown&&"bg-bluish-cyan"} hover:cursor-pointer hover:bg-bluish-cyan rounded `}>
        <Avatar userName={userName} />
        <p className=" text-center">{userName}</p>
      </div>
    </div>
  );
}
function Avatar({ userName }: { userName: string }) {
  return (
    <div className=" bg-grayish-brown rounded-full w-10 text-center ">
      <p className="p-2">{getInitials(userName)}</p>
    </div>
  );
}

function LogOut() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <div className=" py-3 text-center hover:text-bright-orange font-bold rounded mb-3 px-3 bg-bright-orange hover:cursor-pointer hover:ring-2 hover:ring-bright-orange hover:bg-transparent" onClick={handleSignOut}>
      LogOut
    </div>
  );
}
export default Profile;
