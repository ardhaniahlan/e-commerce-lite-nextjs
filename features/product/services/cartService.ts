import apiClient from "@/lib/axios";

export interface CartPayload {
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}

// 1. Mengambil cart berdasarkan ID user
export const getUserCartAPI = async (userId: number) => {
  try {
    const response = await apiClient.get(`/carts/user/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Gagal mengambil data cart dari API");
  }
};

// 2. Hit POST ke endpoint /carts (Menambah/Membuat Cart baru)
export const addCartAPI = async (payload: CartPayload) => {
  try {
    const response = await apiClient.post("/carts", payload);
    return response.data; // Server akan mengembalikan respons sukses beserta ID cart tiruan
  } catch (error: any) {
    throw new Error(error.response?.data || "Gagal menambah cart ke API");
  }
};

// 3. Hit PUT ke endpoint /carts/{id} (Update Cart)
export const updateCartAPI = async (cartId: number, payload: CartPayload) => {
  try {
    const response = await apiClient.put(`/carts/${cartId}`, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Gagal mengupdate cart ke API");
  }
};

// 4. Hit DELETE ke endpoint /carts/{id} (Hapus Cart)
export const deleteCartAPI = async (cartId: number) => {
  try {
    const response = await apiClient.delete(`/carts/${cartId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Gagal menghapus cart dari API");
  }
};