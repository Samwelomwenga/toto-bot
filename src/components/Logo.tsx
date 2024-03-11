import { Leckerli_One} from "next/font/google";


const leckerli = Leckerli_One({weight:"400", subsets: ["latin"] });
function Logo() {
  return (
    <h1 className={`text-3xl font-bold md:pt-4 text-orange-400 hover:cursor-pointer hover:text-orange-300 ${leckerli.className}`}><a href="/">TOTOBOT</a></h1>
  )
}

export default Logo