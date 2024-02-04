"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ImSpinner9 } from "react-icons/im";
import { ToastContainer, toast,Slide } from 'react-toastify';


export const SignupSchema = z.object({
  name: z
    .string()
    .refine((name) => name.trim().length > 0, {
      message: "Name cannot be empty",
    })
    .refine((name) => name.trim().length < 50, {
      message: "Name cannot be more than 50 characters",
    })
    .refine((name) => /^[a-zA-Z\s]*$/.test(name), {
      message: "Name can only contain letters and spaces",
    })
    .refine((name) => /^\s*([a-zA-Z]+)\s+([a-zA-Z]+)\s*$/.test(name), {
      message: "Name must contain  first name and last name",
    }),
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
    }).refine((password) => password.trim().length > 5, {
      message: "Password must be at least 6 characters long",
    })
    
    .refine((password) => password.trim().length < 50, {
      message: "Password cannot be more than 50 characters",
    })
    
});
export type SignupData = z.infer<typeof SignupSchema>;
export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
  });
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (data: SignupData) => {
    try {
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            user_name: data.name,
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      toast.success('SignedUP!', {
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
      toast.error('An Error Occurred!', {
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
       <h1 className="text-4xl font-semibold text-center pt-24 pb-10">Sign Up</h1>
      <p className="text-center text-xl pb-10"><span className="block font-bold"> 
      Create an account</span> Sign up to get started!

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
        <input
          {...register("name")}
          className="block  w-full my-2 py-3 px-4 rounded"
          placeholder="e.g Jane Doe"
          type="text"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <label className=" text-lg font-semibold" htmlFor="email">
          {" "}
          Email
        </label>
        <input
          {...register("email")}
          className="block  w-full my-2 py-3 px-4 rounded"
          placeholder="e.g johndoe@gmail.com"
          type="email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <label className=" text-lg font-semibold" htmlFor="password">
          Password
        </label>
        <input
          {...register("password")}
          className="block  w-full my-2 py-3 px-4 rounded"
          placeholder="Enter your password..."
          type="password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <button className="bg-orange-400 py-3 px-4 rounded-md border-none text-center mt-14 hover:text-orange-400 hover:bg-green-200 transition-2000">
          {" "}
          
          {isLoading ? <ImSpinner9 /> : "Sign Up"}
        </button>
      </form>
      <ToastContainer />
    </main>
  );
}
