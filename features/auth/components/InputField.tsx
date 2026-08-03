import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  rightElement?: React.ReactNode;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
}

const InputField = ({
  label,
  name,
  type,
  placeholder,
  rightElement,
  register,
  error
}: InputFieldProps) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm text-gray-600 font-medium">{label}</label>
        {rightElement && <span className="text-sm text-blue-600 cursor-pointer">{rightElement}</span>}
      </div>
      <input
      type={type}
      placeholder={placeholder}
      {...register}
      className={`px-4 py-3 bg-[#F9FAFB] border rounded-xl focus:outline-none focus:ring-2 text-sm ${
        error ? "border-red-500 focus:ring-red-200" : "border-gray-100 focus:ring-blue-500"
      }`}
    />
    {error && <span className="text-xs text-red-500 mt-1">{error.message}</span>}
    </div>
  );
};

export default InputField;