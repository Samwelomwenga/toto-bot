"use client";
import { ImSpinner9 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSignup from "../hooks/useSignup";
import ConfirmEmailPrompt from "@/components/ConfirmEmailPrompt";
import InputField from "@/components/InputField";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Signup() {
  const {
    register,
    handleSubmit,
    handleSignUpWithGoogle,
    errors,
    isLoading,
    handleSignup,
    isEmailVerified,
  } = useSignup();

  return (
    <>
      <ToastContainer />
      <main className="bg-gray-300 dark:bg-blue-charcoal h-svh w-full  text-black dark:text-white grid place-items-center">
        <ThemeSwitcher />
        {isEmailVerified === false && <ConfirmEmailPrompt />}
        <h1 className=" text-2xl md:text-4xl lg:text-2xl font-semibold text-center">Sign Up</h1>
        <p className="text-center text-xl">
          <span className="block font-bold">Create an account</span> Sign up to
          get started!
        </p>
        <form
          noValidate
          autoComplete="off"
          className=" bg-greenish-cyan dark:bg-mirage  shadow-lg   px-6 py-3 rounded mx-6 md:mx-auto md:w-96  "
          onSubmit={handleSubmit(handleSignup)}
        >
          <label className=" text-lg font-semibold" htmlFor="email">
            {" "}
            Name
          </label>
          <InputField
            register={register}
            placeholder="e.g Jane Doe"
            type="name"
            name="name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <label className=" text-lg font-semibold" htmlFor="email">
            {" "}
            Email
          </label>
          <InputField
            register={register}
            placeholder="e.g johndoe@gmail.com "
            type="email"
            name="email"
          />

          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <label className=" text-lg font-semibold" htmlFor="password">
            Password
          </label>
          <InputField
            register={register}
            placeholder="Enter your password..."
            type="password"
            name="password"
          />

          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button
            disabled={isLoading}
            className="bg-bright-orange dark:bg-yellow-green py-3 px-16 mx-12 my-4 text-lg text-white dark:hover:text-yellow-green font-medium rounded-md border-none text-center hover:text-bright-orange hover:bg-transparent dark:hover:bg-transparent hover:ring-2 hover:ring-bright-orange dark:hover:ring-yellow-green  transition-2000"
          >
            {" "}
            {isLoading ? <ImSpinner9 /> : <p>SIGN UP</p>}{" "}
          </button>
        <a
          href="/login"
          className="text-center block hover:cursor-pointer hover:text-bright-orange dark:hover:text-yellow-green"
        >
          You have an account? login
        </a>
        </form>
        <button
          onClick={handleSignUpWithGoogle}
          className="flex place-items-center gap-4 ring-bright-orange dark:ring-yellow-green dark:hover:text-yellow-green ring-2  py-3 px-4 mx-auto mb-40 lg:mb-10  text-lg font-medium rounded-md  text-center  hover:text-bright-orange hover:ring-0  transition-2000"
        >
          <FcGoogle size={24} />
           <p>Sign Up with Google</p>{" "}
        </button>
      </main>
    </>
  );
}
