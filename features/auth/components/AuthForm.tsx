import InputField from "./InputField";

interface AuthFormProps {
  mode?: "login" | "register";
  onSubmit?: (e: React.FormEvent) => void;
}

const AuthForm = ({ mode = "login", onSubmit }: AuthFormProps) => {
  const isLogin = mode === "login";

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>
      <p className="text-gray-500 mb-6">
        {isLogin
          ? "Enter your credentials to access your account."
          : "Fill in the details to get started."}
      </p>

      <form onSubmit={onSubmit}>
        {!isLogin && (
          <InputField
            label="Username"
            name="username"
            type="text"
            placeholder="janedoe"
          />
        )}

        <InputField
          label={isLogin ? "Username or Email" : "Email"}
          name={isLogin ? "identifier" : "email"}
          type={isLogin ? "text" : "email"}
          placeholder={isLogin ? "janedoe or jane@mail.com" : "jane@mail.com"}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          rightElement={isLogin ? "Forgot?" : null}
        />

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded-lg font-medium mt-2 hover:bg-blue-800 transition-colors"
        >
          {isLogin ? "Sign In →" : "Sign Up →"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;