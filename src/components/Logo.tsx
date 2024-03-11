import { Leckerli_One} from "next/font/google";


const leckerli = Leckerli_One({weight:"400", subsets: ["latin"] });
function Logo() {
  return (
    <h1 className={`text-3xl font-bold text-orange-400 ${leckerli.className}`}>TOTOBOT</h1>
  )
}

export default Logo