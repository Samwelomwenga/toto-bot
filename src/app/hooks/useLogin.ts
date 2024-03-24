import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabase";
import { toast, Slide } from "react-toastify";
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
function useLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          router.push("/");
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }
  , [router]);


  const handleLogin = async (data: FormData) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        throw new Error(error.message);
      }
      toast.success("SignedIn!", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      router.refresh();
    } catch (e) {
      const error = e as Error;
      console.log(error);
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogInWithGoogle = async () => {
    try {
      setIsLoading(true);
      let { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (e) {
      const error = e as Error;
      console.log(error);
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    handleLogin,
    handleLogInWithGoogle,
  };
}

export default useLogin;
