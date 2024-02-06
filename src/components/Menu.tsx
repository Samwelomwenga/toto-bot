
function Menu({isOpen}:{isOpen: boolean}){
  return (
    <ul className={` bg-black   h-48 rounded shadow-md animate-fade-in-right  m-h-svh ${isOpen?"block":"hidden"} md:block w-5/6 min-h-screen z-20`}>
    <li className="text-2xl font-semibold text-orange-400">Home</li>
    <li className="text-2xl font-semibold text-orange-400">About</li>
    <li className="text-2xl font-semibold text-orange-400"><a>Logout</a></li>
  </ul>
  )
}

export default Menu