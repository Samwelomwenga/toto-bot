import { useState } from "react";
import { useForm } from "react-hook-form";
import { Slide, toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../utils/supabase";

const RecoverPasswordSchema = z.object({
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
});
type RecoverPasswordData = z.infer<typeof RecoverPasswordSchema>;

function useRecoverPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordData>(
    {
      resolver: zodResolver(RecoverPasswordSchema),
    }
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleRecoverPassword = async (formData: RecoverPasswordData) => {
    setIsLoading(true);
    try {
      const { email } = formData;
      let { data,error } = await supabase.auth.resetPasswordForEmail(email);
      console.log(data);
      if (error) {
        throw new Error(error.message);
      }
      toast.success(`Password recovery email sent to ${email}`, {
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
  return { register, handleSubmit, errors, isLoading, handleRecoverPassword };
}

export default useRecoverPassword;
