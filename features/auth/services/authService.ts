import apiClient from '@/lib/axios';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
}

export const loginAPI = async (data: LoginRequest): Promise<LoginResponse> => {
  const savedUserStr = localStorage.getItem('dummy_user');
  
  if (savedUserStr) {
    const savedUser = JSON.parse(savedUserStr);
    
    const isUsernameMatch = savedUser.username === data.username;
    const isEmailMatch = savedUser.email === data.username; 
    const isPasswordMatch = savedUser.password === data.password;

    if ((isUsernameMatch || isEmailMatch) && isPasswordMatch) {
      console.log("Login menggunakan data lokal berhasil!");
      return { token: "simulated-jwt-token-123456789" };
    }
  }

  try {
    const response = await apiClient.post('/auth/login', {
      username: data.username,
      password: data.password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Gagal melakukan login");
  }
};

export const registerAPI = async (data: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post('/users', {
      username: data.username,
      email: data.email,
      password: data.password,
    });
    localStorage.setItem('dummy_user', JSON.stringify(data));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Gagal melakukan register");
  }
};