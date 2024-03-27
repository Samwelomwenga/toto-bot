"use client";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner9 } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useLogin from "../hooks/useLogin";
import InputField from "@/components/InputField";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Login() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    handleLogin,
    handleLogInWithGoogle,
  } = useLogin();

  return (
    <>
      <ToastContainer />
      <main className=" bg-gray-300 h-svh w-full  text-black grid place-items-center">
        <ThemeSwitcher />
        <h1 className="text-4xl font-semibold text-center">Login</h1>
        <p className="text-center text-xl">
          <span className="block font-bold">Welcome back!</span> Login to your
          account
        </p>
        <form
          noValidate
          autoComplete="off"
          className="p-6 rounded mx-6 md:mx-auto md:w-96 bg-greenish-cyan shadow-lg"
          onSubmit={handleSubmit(handleLogin)}
        >
          <label className=" text-lg font-semibold" htmlFor="email">
            {" "}
            Email
          </label>
          <InputField
            register={register}
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <label className=" text-lg font-semibold" htmlFor="password">
            Password
          </label>
          <InputField
            register={register}
            type="password"
            name="password"
            placeholder="Enter your password..."
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <p className="text-right pt-4">
        <a href="/recover" className=" hover:text-bright-orange">
          forgot password?
        </a></p>
          <button
            disabled={isLoading}
            className=" bg-bright-orange py-3 px-16 mx-12 my-8 text-lg text-white hover:text-bright-orange font-medium rounded-md border-none text-center hover:ring-2 hover:bg-transparent hover:ring-bright-orange transition-2000"
          >
            {" "}
            {isLoading ? <ImSpinner9 /> : "Login"}{" "}
          </button>
        <a
          href="/signup"
          className="text-center block hover:cursor-pointer hover:text-bright-orange"
        >
          Don`t have an account? Sign up
        </a>
        </form>
        <button
          onClick={handleLogInWithGoogle}
          className="flex place-items-center gap-4 ring-bright-orange ring-2  py-3 px-4 mx-auto mb-40 lg:mb-10  text-lg font-medium rounded-md  text-center  hover:bg-orange-200 hover:ring-0  transition-2000"
        >
          {" "}
          <FcGoogle size={24} />
           <p>Login with Google</p>{" "}
        </button>
      </main>
    </>
  );
}
