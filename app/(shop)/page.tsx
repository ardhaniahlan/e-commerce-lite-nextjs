"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.replace("/auth");
    }
    setIsAuthenticated(!!token);
  }, [router]);

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center h-screen w-full">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mb-4"></div>
      <p className="text-gray-600 text-lg">Memuat sesi...</p>
    </div>
  </div>;
  }
  
  const handleLogout = () => {
    localStorage.removeItem('auth_token'); 
    router.replace('/auth'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-8">
          Sesi kamu aman! Token terdeteksi di dalam sistem.
        </p>
        
        <button 
          onClick={handleLogout}
          className="px-6 py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors"
        >
          Logout Sekarang
        </button>
      </div>
    </div>
  );
};

export default Dashboard;