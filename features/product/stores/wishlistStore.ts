import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product.types';

interface WishlistState {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (product) => {
        const currentItems = get().items;
        if (!currentItems.some((item) => item.id === product.id)) {
          set({ items: [...currentItems, product] });
        }
      },

      removeFromWishlist: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);