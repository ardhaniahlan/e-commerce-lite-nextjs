"use client";

import { useCartStore } from "@/features/product/stores/cartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ShippingPage = () => {
  const router = useRouter();
  const { items } = useCartStore();

  const [fullName, setFullName] = useState("Ardhani Ahlan");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(
    "Bekasi Regency, West Java, Indonesia",
  );
  const [postalCode, setPostalCode] = useState("");

  const subtotal = items.reduce((sum, item) => {
    const qty = item.quantity || 1;
    return sum + item.price * qty;
  }, 0);
  const totalItemsCount = items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );
  const taxEstimate = subtotal > 0 ? subtotal * 0.08 : 0;
  const finalTotal = subtotal + taxEstimate;

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/dashboard");
    }
  }, [items, router]);

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !postalCode) {
      toast.error("Harap lengkapi semua data pengiriman!");
      return;
    }

    toast.success("Alamat tersimpan, lanjut ke pembayaran.");
    router.push("/payment");
  };

  if (items.length === 0) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, "$1-");

    if (formattedValue.length <= 16) {
      setPhone(formattedValue);
    }
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = rawValue.replace(/(\d{5})(?=\d)/g, "$1-");
    if (formattedValue.length <= 5) {
      setPostalCode(formattedValue);
    }
  };

  return (
    <div className="px-4 md:px-24 py-10 bg-white min-h-screen text-slate-900">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 mb-8 gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#0044CC] uppercase block mb-1">
            Checkout Step 2
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Shipping Information
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <Link
            href="/cart"
            className="text-gray-400 hover:text-[#0044CC] transition-colors"
          >
            01 Bag
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#0044CC] font-bold">02 Shipping</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400">03 Payment</span>
        </div>
      </div>

      <form
        onSubmit={handleContinueToPayment}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
      >
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-[#F9FAFC] border border-gray-100 rounded-3xl p-8">
            <h3 className="text-lg font-extrabold text-slate-900 mb-6">
              Delivery Address
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0044CC] transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel" 
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0044CC] transition-colors"
                  placeholder="0812-3456-7890"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Street Address & City
                </label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0044CC] transition-colors resize-none"
                  placeholder="Enter your full delivery address"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Postal Code
                </label>
                <input
                  type="tel"
                  required
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0044CC] transition-colors"
                  placeholder="e.g. 17510"
                />
              </div>
            </div>
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

          <button
            type="submit"
            className="w-full bg-[#0044CC] text-white font-bold py-4 px-6 rounded-2xl hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2"
          >
            Continue to Payment
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
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingPage;
