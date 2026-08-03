interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  rightElement?: React.ReactNode;
}

const InputField = ({
  label,
  name,
  type,
  placeholder,
  rightElement,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm text-gray-600 font-medium">{label}</label>
        {rightElement && <span className="text-sm text-blue-600 cursor-pointer">{rightElement}</span>}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default InputField;