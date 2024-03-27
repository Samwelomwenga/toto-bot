"use client"
import { ImSpinner9 } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUpdatePassword from "../hooks/useUpdatePassword";
import { Input } from "postcss";
import InputField from "@/components/InputField";

export default function Update() {
  const { register, handleSubmit, errors,isLoading,handleUpdatePassword  } =useUpdatePassword();
   

  return (
    <>
      <ToastContainer />
      <main className="bg-gray-300 dark:bg-blue-charcoal h-svh w-full  text-black dark:text-white grid place-items-center">
        <h1 className="text-4xl font-semibold text-center">Update Password</h1>
        <p className="text-center text-xl">
          Please enter a new password to update your account
        </p>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleUpdatePassword)}
          className=" bg-greenish-cyan  dark:bg-mirage px-6 pt-20  pb-10 rounded mx-6 md:mx-auto md:w-96 "
        >
         
           <label className=" text-lg font-semibold" htmlFor="password">
            Password
          </label>
          <InputField register={register} type="password" name="password" placeholder="password"/>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
           
         

          <button
            disabled={isLoading}
            className="bg-bright-orange dark:bg-yellow-green py-3 px-16 mx-12 mt-14 mb-8 text-lg text-white hover:text-bright-orange dark:hover:text-yellow-green  font-medium rounded-md border-none text-center  hover:bg-transparent dark:hover:bg-transparent hover:ring-2 hover:ring-bright-orange dark:hover:ring-yellow-green  transition-2000"
          >
            {" "}
            {isLoading ? <ImSpinner9 /> : <p>Update</p>}{" "}
          </button>
        </form>

        <a
          href="/login"
          className="text-center block hover:cursor-pointer hover:text-bright-orange dark:hover:text-yellow-green mb-52"
        >
          Back to login
        </a>
      </main>
    </>
  );
}
