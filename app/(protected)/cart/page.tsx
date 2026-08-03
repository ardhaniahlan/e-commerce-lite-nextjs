"use client";

import { useCartStore } from "@/features/product/stores/cartStore";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const taxEstimate = subtotal > 0 ? subtotal * 0.08 : 0;
  const finalTotal = subtotal > 0 ? subtotal + taxEstimate - discount : 0;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "CODE10") {
      setDiscount(10);
      toast.success("Kode promo berhasil diterapkan!");
    } else {
      toast.error("Kode promo tidak valid (Coba: CODE10)");
    }
  };

  return (
    <div className="px-4 md:px-24 py-10 bg-white min-h-screen text-slate-900">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 mb-8 gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#0044CC] uppercase block mb-1">
            Your Selection
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Bag
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="text-[#0044CC] font-bold">01 Bag</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400">02 Shipping</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400">03 Payment</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center justify-center gap-4">
          <p className="text-gray-400 text-sm font-medium">
            Keranjang belanja Anda masih kosong.
          </p>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-[#0044CC] text-white text-xs font-bold rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F9FAFC] border border-gray-100 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-white rounded-2xl p-3 shrink-0 flex items-center justify-center border border-gray-100 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-0.5">
                        Product ID: #{item.id * 1234}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 capitalize">
                        {item.category} / Quality Assured
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                    <span className="text-base font-extrabold text-[#0044CC]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-xs">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="text-gray-400 hover:text-slate-900 font-bold px-1 text-sm transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-slate-800 px-3">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="text-gray-400 hover:text-slate-900 font-bold px-1 text-sm transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#F9FAFC] border border-dashed border-gray-300 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-[#0044CC] rounded-2xl shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6h.008v.008H6V6z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                    Have a promotional code?
                  </h4>
                  <p className="text-xs text-gray-500">
                    Enter it to unlock exclusive discounts. (Coba:{" "}
                    <span className="font-semibold text-slate-700">CODE10</span>
                    )
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleApplyPromo}
                className="flex items-center w-full sm:w-auto bg-white border border-gray-200 rounded-2xl p-1 shadow-xs"
              >
                <input
                  type="text"
                  placeholder="CODE10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="px-3 py-1.5 text-xs uppercase font-bold text-slate-800 bg-transparent outline-none w-28"
                />
                <button
                  type="submit"
                  className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#0044CC] transition-colors"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#121824] text-white p-8 rounded-3xl shadow-xl flex flex-col">
            <h3 className="text-lg font-extrabold tracking-tight mb-6 pb-4 border-b border-gray-800">
              Order Summary
            </h3>

            <div className="flex flex-col gap-4 text-xs font-medium text-gray-300 mb-6 pb-6 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span className="font-bold text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="font-bold text-gray-400 uppercase tracking-wider">
                  Calculated Next
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tax Estimate</span>
                <span className="font-bold text-white">
                  ${taxEstimate.toFixed(2)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center text-green-400">
                  <span>Discount Promo</span>
                  <span className="font-bold">-${discount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="flex items-baseline justify-between mb-8">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-0.5">
                  Total Amount
                </span>
                <div className="text-3xl font-black text-white">
                  ${finalTotal.toFixed(2)}
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mb-6 -mt-4">
              Includes VAT and standard handling fees.
            </p>

            <Link
              href="/shipping"
              className="w-full bg-[#0044CC] text-white font-bold py-4 px-6 rounded-2xl hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2 mb-3"
            >
              Checkout Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>

            <button className="w-full bg-[#1E2636] text-gray-200 font-bold py-3.5 px-6 rounded-2xl hover:bg-gray-800 transition-all border border-gray-700/60 flex items-center justify-center gap-2 mb-8 text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-4 h-4 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                />
              </svg>
              Express Pay with Wallet
            </button>

            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-gray-800/80 text-center">
              <div className="flex flex-col items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider">
                  SECURE
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400"
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
                <span className="text-[10px] font-bold text-gray-400 tracking-wider">
                  TRACKED
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider">
                  30D RETURN
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
