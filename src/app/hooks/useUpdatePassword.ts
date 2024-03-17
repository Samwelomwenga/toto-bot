import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "../utils/supabase";
import { Slide, toast } from "react-toastify";

const updatePasswordSchema = z
  .object({
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
        (email) =>
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email),
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
    confirmPassword: z
      .string()
      .refine((confirmPassword) => confirmPassword.trim().length > 0, {
        message: "Password cannot be empty",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });
type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;

function useUpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleUpdatePassword = async (data: UpdatePasswordData) => {
    setIsLoading(true);
    const { email, password } = data;
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: email,
        password: password,
      });
      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      toast.success("Password updated successfully", {
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
      console.error(error.message);
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

  return { register, handleSubmit, errors, isLoading, handleUpdatePassword };
}

export default useUpdatePassword;
