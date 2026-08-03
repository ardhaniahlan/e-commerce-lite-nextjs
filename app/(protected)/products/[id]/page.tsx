"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Product } from "@/features/product/types/product.types";
import { getProductByIdAPI } from "@/features/product/services/productService";
import { useWishlistStore } from "@/features/product/stores/wishlistStore";
import { useCartStore } from "@/features/product/stores/cartStore";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams();
  const rawId = params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const { items, addToWishlist, removeFromWishlist } = useWishlistStore();
  const isWishlisted = product
    ? items.some((item) => item.id === product.id)
    : false;

  const handleWishlistClick = () => {
    if (!product) return;
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.error("Produk dihapus dari wishlist");
    } else {
      addToWishlist(product);
      toast.success("Produk berhasil ditambahkan ke wishlist!");
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    toast.success("Produk berhasil ditambahkan ke keranjang!");
  };

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getProductByIdAPI(id);
        setProduct(data);
      } catch (error) {
        console.error("Gagal memuat detail produk:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-400 animate-pulse text-sm font-medium">
          Memuat detail produk...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <p className="text-slate-700 font-semibold">Produk tidak ditemukan.</p>
        <Link href="/dashboard" className="text-blue-600 underline text-sm">
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-24 py-8 bg-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-gray-100 gap-4">
        <div className="text-xs font-semibold tracking-wider text-slate-800 uppercase flex items-center gap-2">
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            Catalog
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400">{product.category}</span>
          <span className="text-gray-300">/</span>
          <span className="text-slate-900 truncate max-w-50 sm:max-w-xs">
            {product.title}
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium text-slate-700">
          <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
            Share
          </button>
          <button
            onClick={handleWishlistClick}
            className={`flex items-center gap-1.5 transition-colors ${
              isWishlisted
                ? "text-red-500 font-bold"
                : "hover:text-red-500 text-slate-700"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            {isWishlisted ? "Wishlisted" : "Wishlist"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 bg-[#F7F8FA] p-12 rounded-3xl flex items-center justify-center relative aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain max-h-115 w-full mix-blend-multiply transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-6 left-6 bg-slate-900 text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full uppercase">
            New Evolution
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-blue-700">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-sm">
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs font-bold text-gray-500">
              {product.rating?.count || 124} REVIEWS
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            {product.title}
          </h1>

          <div className="text-2xl font-bold text-blue-700 mb-6">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Quantity
              </label>
              <div className="flex items-center justify-between bg-[#F7F8FA] border border-gray-200 rounded-xl px-4 py-2.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-blue-700 font-bold text-base transition-colors"
                >
                  -
                </button>
                <span className="text-sm font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-blue-700 font-bold text-base transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-[#0044CC] text-white font-bold py-4 px-6 rounded-2xl hover:bg-blue-800 transition-all shadow-md flex items-center justify-center gap-3 mb-6"
          >
            {isAdded ? "BERHASIL DITAMBAHKAN!" : "ADD TO BAG"}
          </button>

          <div className="flex items-center justify-center gap-8 text-xs text-gray-400 font-medium pt-2 border-t border-gray-100">
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18.75 18.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.375v10.5m15 0H5.25m14.25 0h1.5c.621 0 1.125-.504 1.125-1.125v-3.75a4.5 4.5 0 00-1.125-2.625l-2.25-2.25a2.25 2.25 0 00-1.59-.66H13.5"
                />
              </svg>
              Free Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99్‌"
                />
              </svg>
              30-Day Returns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
