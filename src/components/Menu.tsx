import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function Menu({isOpen}:{isOpen: boolean}){
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  
  return (
    <ul className={` bg-black   h-48 rounded shadow-md animate-fade-in-right  m-h-svh ${isOpen?"block":"hidden"} md:block w-5/6 min-h-screen z-20`}>
    <li className="text-2xl font-semibold text-orange-400">Home</li>
    <li className="text-2xl font-semibold text-orange-400">About</li>
    <li className="text-2xl font-semibold text-orange-400" onClick={handleSignOut}><a>Logout</a></li>
  </ul>
  )
}

export default Menu