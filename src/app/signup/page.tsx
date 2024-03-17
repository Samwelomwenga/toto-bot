"use client";
import { ImSpinner9 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSignup from "../hooks/useSignup";
import ConfirmEmailPrompt from "@/components/ConfirmEmailPrompt";
import InputField from "@/components/InputField";

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
      <main className="bg-green-200 h-svh w-full  text-black grid place-items-center">
        {isEmailVerified === false && <ConfirmEmailPrompt />}
        <h1 className="text-4xl font-semibold text-center">Sign Up</h1>
        <p className="text-center text-xl">
          <span className="block font-bold">Create an account</span> Sign up to
          get started!
        </p>
        <form
          noValidate
          autoComplete="off"
          className=" bg-teal-400   px-6 pt-20  pb-10 rounded mx-6 md:mx-auto md:w-96  "
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
            className="bg-orange-400 py-3 px-16 mx-12 mt-14 mb-8 text-lg font-medium rounded-md border-none text-center  hover:bg-orange-300 transition-2000"
          >
            {" "}
            {isLoading ? <ImSpinner9 /> : <p>SIGN UP</p>}{" "}
          </button>
        </form>
        <button
          onClick={handleSignUpWithGoogle}
          className="flex place-items-center gap-4 ring-orange-400 ring-2  py-3 px-4 mx-auto  text-lg font-medium rounded-md  text-center  hover:bg-orange-200 hover:ring-0  transition-2000"
        >
          <FcGoogle size={24} />
          {isLoading ? <ImSpinner9 /> : <p>Sign Up with Google</p>}{" "}
        </button>
        <a
          href="/login"
          className="text-center block hover:cursor-pointer hover:text-orange-400"
        >
          You have an account? login
        </a>
      </main>
    </>
  );
}
