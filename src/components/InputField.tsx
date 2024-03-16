import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

type SignUpFieldProps = UseFormRegister<{
  name: string;
  email: string;
  password: string;
}>;
type loginFieldProps = UseFormRegister<{
  email: string;
  password: string;
}>;
type InputFieldProps = {
  register: SignUpFieldProps;
  placeholder: string;
  type: string;
  name: "name" | "email" | "password";
};
function InputField({ register, placeholder, type, name }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative">
      <input
      // Error
      // This expression is not callable.
      // Each member of the union type 'SignUpFieldProps | loginFieldProps' has signatures, but none of those signatures are compatible with each other.ts(2349)
        {...register(name)}
        className="block  w-full my-2 py-3 px-4 rounded"
        placeholder={placeholder}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
      />
      {type == "password" ? (
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={handleShowPassword}
        >
          {showPassword ? <IoEyeOff size={24} /> : <IoEye size={24} />}
        </div>
      ) : null}
    </div>
  );
}

export default InputField;
