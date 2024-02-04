"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ImSpinner9 } from "react-icons/im";
import { ToastContainer, toast, Slide } from "react-toastify";

export const FormSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.trim().length > 0, {
      message: "Email cannot be empty",
    })
    .refine((email) => email.trim().length < 50, {
      message: "Email cannot be more than 50 characters",
    })
    .refine(
      (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email),
      {
        message: "Please enter a valid email",
      }
    )
    .refine(
      (email) =>
        /^\s*([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})\s*$/.test(email),
      {
        message: "Email cannot contain leading or trailing spaces",
      }
    ),
  password: z
    .string()
    .refine((password) => password.trim().length > 0, {
      message: "Password cannot be empty",
    })
    .refine((password) => password.trim().length > 5, {
      message: "Password must be at least 6 characters long",
    })

    .refine((password) => password.trim().length < 50, {
      message: "Password cannot be more than 50 characters",
    }),
});
export type FormData = z.infer<typeof FormSchema>;
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: FormData) => {
    try {
      setIsLoading(true);
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      toast.success("SignedUP!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("An Error Occurred!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-green-200 h-svh w-full  text-black">
      <ToastContainer />
      <h1 className="text-4xl font-semibold text-center pt-24 pb-10">Login</h1>
      <p className="text-center text-xl pb-10">
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
          className="bg-orange-400 py-3 px-16 mx-12 mt-14 mb-8 text-lg font-medium rounded-md border-none text-center  hover:text-orange-400 hover:bg-green-200 transition-2000"
        >
          {" "}
          {isLoading ? <ImSpinner9 /> : "Login"}{" "}
        </button>
        <a
          href="/signup"
          className="text-center block hover:cursor-pointer hover:text-orange-400"
        >
          Don`t have an account? Sign up
        </a>
      </form>
    </main>
  );
}
