import * as z from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(1, { message: "Username or Email tidak boleh kosong" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong" }),
});

export const registerSchema = z.object({
  username: z.string().min(3, { message: "Username minimal 3 karakter" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});

export type AuthFormData = {
  identifier?: string;
  username?: string;
  email?: string;
  password: string;
};