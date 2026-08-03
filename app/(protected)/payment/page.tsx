"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import QRCode from "react-qr-code";
import { useCartStore } from "@/features/product/stores/cartStore";
import { toast } from "sonner";

export default function PaymentPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();

  const [paymentStatus, setPaymentStatus] = useState<"pending" | "verified">(
    "pending",
  );
  const [orderId, setOrderId] = useState("");

  const isCheckoutSuccess = useRef(false);

  const subtotal = items.reduce((sum, item) => {
    const qty = item.quantity || 1;
    return sum + item.price * qty;
  }, 0);

  const taxEstimate = subtotal > 0 ? subtotal * 0.08 : 0;
  const processingFee = 0.0;
  const totalAmount = subtotal + taxEstimate + processingFee;

  useEffect(() => {
    if (items.length === 0 && !isCheckoutSuccess.current) {
      toast.error("Keranjang kosong, kembali ke belanja.");
      router.replace("/dashboard");
    } else if (items.length > 0 && !orderId) {
      const randomId = Math.floor(100000 + Math.random() * 900000);
      setOrderId(`#LT-${randomId}-X`);
    }
  }, [items, router, orderId]);

  const handleSimulateScan = () => {
    const loadingToast = toast.loading("Menunggu sinyal dari bank...");
    setTimeout(() => {
      toast.dismiss(loadingToast);
      setPaymentStatus("verified");
      toast.success("Pembayaran terverifikasi!");
    }, 2000);
  };

  const handleConfirmPayment = () => {
    if (paymentStatus !== "verified") {
      toast.error("Silakan scan QR code terlebih dahulu.");
      return;
    }

    isCheckoutSuccess.current = true;

    clearCart();

    toast.success("Pesanan berhasil dibuat!");
    router.push("/dashboard");
  };

  if (items.length === 0) return null;

  return (
    <div className="px-4 md:px-24 py-10 bg-white min-h-screen text-slate-900">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 mb-8 gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#0044CC] uppercase block mb-1">
            Checkout Step 3
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Payment
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
          <Link
            href="/shipping"
            className="text-gray-400 hover:text-[#0044CC] transition-colors"
          >
            02 Shipping
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#0044CC] font-bold">03 Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#F9FAFC] border border-gray-100 rounded-3xl p-10 min-h-125">
          {paymentStatus === "pending" ? (
            <div className="flex flex-col items-center text-center animate-fade-in w-full max-w-sm">
              <div className="w-48 h-48 bg-white p-4 rounded-2xl mb-8 flex items-center justify-center border-2 border-dashed border-gray-300 shadow-sm">
                {orderId ? (
                  <QRCode
                    value={orderId}
                    size={160}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 256 256`}
                  />
                ) : (
                  <div className="animate-pulse bg-gray-200 w-full h-full rounded-xl"></div>
                )}
              </div>
              <h3 className="text-2xl font-extrabold mb-2 text-slate-900">
                Scan to Pay
              </h3>
              <p className="text-sm text-gray-500 mb-8">
                Use your banking app to scan the QR code above to complete your
                purchase.
              </p>

              <button
                onClick={handleSimulateScan}
                className="px-6 py-2.5 bg-blue-50 text-[#0044CC] border border-blue-100 text-xs font-bold rounded-full hover:bg-blue-100 transition-colors shadow-sm"
              >
                (Simulasi) Pura-pura Scan QR
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center animate-fade-in w-full max-w-sm">
              <div className="w-20 h-20 bg-[#F0F5FF] rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 text-[#0044CC]"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold mb-3 text-slate-900">
                Scan Verified
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We've received the signal from your bank. You can now confirm
                your payment to process the order.
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 bg-[#121824] text-white p-8 rounded-3xl shadow-xl flex flex-col">
          <h3 className="text-lg font-extrabold tracking-tight mb-6 pb-4 border-b border-gray-800">
            Order Summary
          </h3>

          <div className="flex items-start justify-between mb-8 bg-[#1A2233] p-4 rounded-xl border border-gray-700/50">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                Order ID
              </span>
              <div className="text-lg font-bold text-white wrap-break-words leading-tight">
                {orderId}
              </div>
            </div>
            <span
              className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${
                paymentStatus === "verified"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              }`}
            >
              {paymentStatus === "verified" ? "Verified" : "Pending"}
            </span>
          </div>

          <div className="flex flex-col gap-4 text-xs font-medium text-gray-300 mb-6 pb-6 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span className="font-bold text-white">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Tax Estimate</span>
              <span className="font-bold text-white">
                ${taxEstimate.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Processing Fee</span>
              <span className="font-bold text-white">
                ${processingFee.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-baseline justify-between mb-8">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-0.5">
                Total Amount
              </span>
              <div className="text-3xl font-black text-white">
                ${totalAmount.toFixed(2)}
              </div>
            </div>
          </div>

          <button
            onClick={handleConfirmPayment}
            disabled={paymentStatus !== "verified"}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
              paymentStatus === "verified"
                ? "bg-[#0044CC] text-white hover:bg-blue-700 cursor-pointer"
                : "bg-[#1A2233] text-gray-500 border border-gray-700 cursor-not-allowed shadow-none"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            CONFIRM PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
}
