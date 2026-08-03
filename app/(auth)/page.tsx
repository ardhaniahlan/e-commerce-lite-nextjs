"use client";

import AuthForm from "@/features/auth/components/AuthForm";
import { AuthFormData } from "@/features/auth/schema/authSchema";
import { loginAPI, LoginRequest, registerAPI, RegisterRequest } from "@/features/auth/services/authService";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const router = useRouter();
  const setLogin = useAuthStore((state) => state.setLogin);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleAuthSubmit = async (data: AuthFormData) => {
    try {
      if (mode === "login") {
        const apiPayload: LoginRequest = {
          username: data.identifier || "",
          password: data.password,
        };

        const result = await loginAPI(apiPayload);
        setLogin(result.token, apiPayload.username);
        router.replace("/dashboard");

      } else {
        const apiPayload: RegisterRequest = {
          username: data.username || "",
          email: data.email || "",
          password: data.password,
        };
        
        await registerAPI(apiPayload);
        toast.success("Registrasi sukses! Silakan login.");
        
        setMode("login"); 
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Terjadi kesalahan, silakan periksa kembali datamu.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex flex-col items-center justify-center p-4 font-sans">
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
          <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 className="text-blue-800 font-bold tracking-widest text-sm uppercase">
          E-Commerce Lite
        </h1>
      </div>

      <div className="bg-[#F1F4FC] p-1 rounded-full flex w-64 mb-6 relative">
        <button
          onClick={() => setMode('login')}
          className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-300 z-10 ${
            mode === 'login' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode('register')}
          className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-300 z-10 ${
            mode === 'register' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Register
        </button>
      </div>

      <AuthForm mode={mode} onSubmit={handleAuthSubmit}/>
    </div>
  );
};

export default Login;