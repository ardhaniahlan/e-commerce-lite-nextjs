import { useEffect } from "react";
import {
  AuthFormData,
  loginSchema,
  registerSchema,
} from "../schema/authSchema";
import {
  loginAPI,
  LoginRequest,
  registerAPI,
  RegisterRequest,
} from "../services/authService";
import InputField from "./InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface AuthFormProps {
  mode?: "login" | "register";
  onSubmit: (data: AuthFormData) => void;
}

const AuthForm = ({ mode = "login", onSubmit }: AuthFormProps) => {
  const isLogin = mode === "login";
  const currentSchema = isLogin ? loginSchema : registerSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(currentSchema) as any,
  });

  useEffect(() => {
    reset();
  }, [mode, reset]);

  const handleInternalSubmit = (data: AuthFormData) => {
    onSubmit(data);
  };

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

      <form onSubmit={handleSubmit(handleInternalSubmit)}>
        {!isLogin && (
          <InputField
            label="Username"
            type="text"
            placeholder="janedoe"
            register={register("username")}
            error={errors.username}
          />
        )}

        <InputField
          label={isLogin ? "Username or Email" : "Email"}
          type={isLogin ? "text" : "email"}
          placeholder={isLogin ? "janedoe or jane@mail.com" : "jane@mail.com"}
          register={register(isLogin ? "identifier" : "email")}
          error={isLogin ? errors.identifier : errors.email}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          register={register("password")}
          error={errors.password}
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
