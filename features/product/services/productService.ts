import apiClient from '@/lib/axios';
import { Product } from '../types/product.types';

export const getProductsAPI = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error: any) {
    console.error("Detail Error Axios:", error.response || error.message);
    throw new Error("Gagal mengambil data produk");
  }
};