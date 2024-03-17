import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast, Slide } from "react-toastify";
import { supabase } from "../utils/supabase";
import { User } from "@supabase/supabase-js";

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
    })
    .refine((password) => password.trim().length > 5, {
      message: "Password must be at least 6 characters long",
    })

    .refine((password) => password.trim().length < 50, {
      message: "Password cannot be more than 50 characters",
    }),
});
export type SignupData = z.infer<typeof SignupSchema>;

function useSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const isEmailVerified = user?.identities?.[0]?.identity_data
    ?.email_verified as boolean;

  const handleSignup = async (formData: SignupData) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            user_name: formData.name,
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      const identities = data?.user?.identities;
      if (!identities?.length) {
        throw new Error("User already exists! Please login.");
      }
      setUser(data.user);
      toast.success("SignedUP!", {
        position: "top-center",
        autoClose: 5000,
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
      console.log(error.message);
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 5000,
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
  const handleSignUpWithGoogle = async () => {
    try {
      setIsLoading(true);
      let {  error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) {
        throw new Error(error.message);
      }
      router.refresh();
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 5000,
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
  }
  return {
    register,
    handleSubmit,
    handleSignUpWithGoogle,
    errors,
    isLoading,
    handleSignup,
    isEmailVerified,
  };
}

export default useSignup;
