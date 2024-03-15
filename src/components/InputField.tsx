import { UseFormRegister } from "react-hook-form";
import { IoEye,IoEyeOff } from "react-icons/io5";

type InputFieldProps = {
    register: UseFormRegister<{
        name: string;
        email: string;
        password: string;
    }>,
    placeholder: string,
    type: string,
    name: "name" | "email" | "password",
}
function InputField({ register, placeholder, type,name }: InputFieldProps) {
    const [showPassword,setShowPassword]=useState(false)

    const handleShowPassword=()=>{
        setShowPassword(!showPassword)
    }
  return (
    <>
      <input
        {...register( name)}
        className="block  w-full my-2 py-3 px-4 rounded"
        placeholder={placeholder}
        type={type}
      />
      <IoEye/>
    </>
  );
}

export default InputField;
