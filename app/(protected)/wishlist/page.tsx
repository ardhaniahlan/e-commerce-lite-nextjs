"use client";

import Link from "next/link";
import ProductCard from "@/features/product/components/ProductCard";
import { useWishlistStore } from "@/features/product/stores/wishlistStore";

export default function WishlistPage() {
  const wishlistItems = useWishlistStore((state) => state.items);

  return (
    <div className="px-4 md:px-24 py-8 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">My Wishlist</h1>
        <p className="text-xs text-gray-400 mt-1">Daftar produk favorit yang Anda simpan.</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center justify-center gap-4">
          <p className="text-gray-400 text-sm font-medium">Belum ada produk di dalam wishlist Anda.</p>
          <Link href="/dashboard" className="px-6 py-2.5 bg-blue-700 text-white text-xs font-bold rounded-xl hover:bg-blue-800 transition-colors">
            Jelajahi Produk
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}