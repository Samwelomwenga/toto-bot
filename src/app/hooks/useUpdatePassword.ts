import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "../utils/supabase";
import { Slide, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const updatePasswordSchema = z.object({
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

type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;

function useUpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordData>({
    resolver: zodResolver(updatePasswordSchema),
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const handleUpdatePassword = async (formData: UpdatePasswordData) => {
    setIsLoading(true);
    const { password } = formData;
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) {
        console.error(error.message);
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
      router.push("/");
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
