import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product.types';
import { addCartAPI, deleteCartAPI, updateCartAPI } from '../services/cartService';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, userId?: number) => Promise<void>;
  removeFromCart: (productId: number, cartId?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number, cartId?: number) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: async (product, quantity = 1, userId = 1) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.id === product.id);

        let updatedItems;
        if (existingIndex > -1) {
          updatedItems = [...currentItems];
          updatedItems[existingIndex].quantity += quantity;
        } else {
          updatedItems = [...currentItems, { ...product, quantity }];
        }

        set({ items: updatedItems });

        try {
          const payload = {
            userId: userId,
            date: new Date().toISOString().split('T')[0],
            products: updatedItems.map((item) => ({ productId: item.id, quantity: item.quantity })),
          };
          const response = await addCartAPI(payload);
          console.log("Berhasil hit API Add Cart (Mock):", response);
        } catch (error) {
          console.error("Gagal hit API Add Cart:", error);
        }
      },

      removeFromCart: async (productId, cartId = 1) => {
        const updatedItems = get().items.filter((item) => item.id !== productId);
        set({ items: updatedItems });

        try {
          const response = await deleteCartAPI(cartId);
          console.log("Berhasil hit API Delete Cart (Mock):", response);
        } catch (error) {
          console.error("Gagal hit API Delete Cart:", error);
        }
      },

      updateQuantity: async (productId, quantity, cartId = 1) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, cartId);
          return;
        }

        const updatedItems = get().items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });

        try {
          const payload = {
            userId: 1,
            date: new Date().toISOString().split('T')[0],
            products: updatedItems.map((item) => ({ productId: item.id, quantity: item.quantity })),
          };
          const response = await updateCartAPI(cartId, payload);
          console.log("Berhasil hit API Update Cart (Mock):", response);
        } catch (error) {
          console.error("Gagal hit API Update Cart:", error);
        }
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);