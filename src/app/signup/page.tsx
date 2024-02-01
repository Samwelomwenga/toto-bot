export default function Signup() {
    return (
      <main className="bg-green-200 h-svh w-full grid place-items-center">
      <form className=" bg-teal-400 text-black  px-6 py-10 rounded grid justify-center " action="/auth/signup" method="post">
        <label className=" text-lg font-semibold" htmlFor="email"> sign Email</label>
        <input  className="block  w-full my-2 py-3 px-4 rounded" name="email" placeholder="e.g johndoe@gmail.com"/>
        <label className=" text-lg font-semibold"  htmlFor="password">Password</label>
        <input className="block  w-full my-2 py-3 px-4 rounded" type="password" name="password" placeholder="Enter your password..."/>
        <button className="bg-orange-400 py-3 px-4 rounded-md border-none text-center mt-14 hover:text-orange-400 hover:bg-green-200 transition-2000"> Sign UP</button>
        {/* <button formAction="/auth/sign-up">Sign Up</button> */}
      </form>
      </main>
    )
  }