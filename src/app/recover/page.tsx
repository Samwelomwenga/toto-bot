"use client";
import { ImSpinner9 } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRecoverPassword from "../hooks/useRecoverPassword";
import InputField from "@/components/InputField";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Recover() {
  const { register, handleSubmit, errors, isLoading, handleRecoverPassword } =
    useRecoverPassword();

  return (
    <>
      <ToastContainer />
      <main className="bg-gray-300 dark:bg-blue-charcoal h-svh w-full  text-black dark:text-white grid place-items-center">
        <ThemeSwitcher />
        <h1 className="text-4xl font-semibold text-center pt-16">Recover Password</h1>
        <p className="text-center text-xl">
          Please enter email to recover your password
        </p>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleRecoverPassword)}
          className=" bg-greenish-cyan dark:bg-mirage   px-6 pt-20  pb-10 rounded mx-6 md:mx-auto md:w-96 "
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

          <button
            disabled={isLoading}
            className="bg-bright-orange dark:bg-yellow-green py-3 px-16 mx-12 mt-14 mb-8 text-lg text-white hover:text-bright-orange dark:hover:text-yellow-green font-medium rounded-md border-none text-center  hover:bg-transparent dark:hover:bg-transparent hover:ring-2 hover:ring-bright-orange dark:hover:ring-yellow-green  transition-2000"
          >
            {" "}
            {isLoading ? <ImSpinner9 /> : <p>Recover</p>}{" "}
          </button>
        </form>

        <a
          href="/login"
          className="text-center block hover:cursor-pointer hover:text-bright-orange dark:hover:text-yellow-green mb-32"
        >
          Back to login
        </a>
      </main>
    </>
  );
}
