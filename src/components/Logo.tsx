import { Leckerli_One} from "next/font/google";


const leckerli = Leckerli_One({weight:"400", subsets: ["latin"] });
function Logo({isLogo}:{isLogo?: boolean}) {
  return (
    <h1 className={`text-3xl font-bold md:pt-4 text-black dark:text-white hover:cursor-pointer hover:text-gray-600 ${!isLogo&& "mx-auto"} ${leckerli.className}`}><a href="/">TOTOBOT</a></h1>
  )
}

export default Logo