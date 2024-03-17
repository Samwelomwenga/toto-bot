"use client";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner9 } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useLogin from "../hooks/useLogin";

export default function Login() {
  const { register, handleSubmit, errors, isLoading, handleLogin,handleLogInWithGoogle } = useLogin();

  return (
    <>
      <ToastContainer />
      <main className="bg-green-200 h-svh w-full  text-black grid place-items-center">
        <h1 className="text-4xl font-semibold text-center">
          Login
        </h1>
        <p className="text-center text-xl">
          <span className="block font-bold">Welcome back!</span> Login to your
          account
        </p>
        <form
          noValidate
          autoComplete="off"
          className=" bg-teal-400   px-6 pt-20  pb-10 rounded mx-6 md:mx-auto md:w-96 "
          onSubmit={handleSubmit(handleLogin)}
        >
          <label className=" text-lg font-semibold" htmlFor="email">
            {" "}
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className={`block  w-full  py-3 px-4 my-3 rounded-md border-2 border-${
              !errors.email ? "gray" : "red"
            }-300 focus:border-none  hover:cursor-pointer`}
            placeholder="e.g johndoe@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <label className=" text-lg font-semibold" htmlFor="password">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="block  w-full my-2 py-3 px-4 rounded"
            placeholder="Enter your password..."
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <button
            disabled={isLoading}
            className="bg-orange-400 py-3 px-16 mx-12 mt-14 mb-8 text-lg font-medium rounded-md border-none text-center  hover:bg-orange-200 transition-2000"
          >
            {" "}
            {isLoading ? <ImSpinner9 /> : "Login"}{" "}
          </button>
         
       
        </form>
        <button
            onClick={handleLogInWithGoogle}
            className="flex place-items-center gap-4 ring-orange-400 ring-2  py-3 px-4 mx-auto  text-lg font-medium rounded-md  text-center  hover:bg-orange-200 hover:ring-0  transition-2000"
          >
            {" "}
            <FcGoogle size={24}/>
            {isLoading ? <ImSpinner9 /> : <p>Login with Google</p>}{" "}
          </button>
          <a
            href="/signup"
            className="text-center block hover:cursor-pointer hover:text-orange-400"
          >
            Don`t have an account? Sign up
          </a>
      </main>
    </>
  );
}
