import { useState } from "react";
import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

//
type InputFieldProps<TFieldValues extends FieldValues> = {
  register: UseFormRegister<TFieldValues>;
  placeholder: string;
  type: string;
  name: FieldPath<TFieldValues>;
};
function InputField<TFieldsValues extends FieldValues>({
  register,
  placeholder,
  type,
  name,
}: InputFieldProps<TFieldsValues>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative">
      <input
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
