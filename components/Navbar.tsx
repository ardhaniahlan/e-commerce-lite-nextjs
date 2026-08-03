"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { useWishlistStore } from "@/features/product/stores/wishlistStore";
import { useCartStore } from "@/features/product/stores/cartStore";

const Navbar = () => {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.length;

  const user = useAuthStore((state) => state.user);
  const setLogout = useAuthStore((state) => state.setLogout);

  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems.length;

  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const username = user?.username || "Akun Saya";
  const dummyAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff`;

  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";

  const pathname = usePathname();
  const isCartPage = pathname === "/cart";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;

    if (keyword.trim() !== "") {
      router.push(`/dashboard?search=${encodeURIComponent(keyword)}`);
    } else {
      router.push(`/dashboard`);
    }
  };

  const handleLogout = () => {
    setLogout();
    router.replace("/auth");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDesktopDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-gray-100 h-16 flex items-center px-4 md:px-24 justify-between sticky top-0 z-50">
      <div className="flex items-center gap-6 md:gap-10">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-700 hover:text-blue-700 focus:outline-none p-1"
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center text-blue-700">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          <span className="text-blue-700 font-bold text-xl tracking-wide">
            LITE
          </span>
        </div>

        <div className="hidden md:flex items-center">
          <Link
            href="/dashboard"
            className="text-blue-700 font-semibold text-sm hover:opacity-80 transition-opacity"
          >
            Shop
          </Link>
        </div>
      </div>

      {!isCartPage && (
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          <div className="relative flex items-center w-full h-10 rounded-lg bg-[#F1F4FC] overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <div className="grid place-items-center h-full w-12 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 bg-transparent pr-2"
              type="text"
              placeholder="Search products..."
              defaultValue={currentSearch}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 md:gap-5">
        <Link
          href="/cart"
          className="relative p-1 text-gray-600 hover:text-blue-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
              {cartCount}
            </span>
          )}
        </Link>

        <div className="w-px h-8 bg-gray-200 hidden md:block"></div>

        <div className="hidden md:block relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
            className="h-9 w-9 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Desktop User Menu"
          >
            <img
              src={dummyAvatarUrl}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </button>

          {isDesktopDropdownOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs text-gray-400 font-medium">
                  Signed in as
                </p>
                <p className="text-sm font-bold text-slate-800 truncate capitalize">
                  {username}
                </p>
              </div>
              <div className="py-1">
                <Link
                  href="/wishlist"
                  onClick={() => setIsDesktopDropdownOpen(false)}
                  className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
              <div className="pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors flex items-center gap-2"
                >
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
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-6 px-6 flex flex-col gap-5  z-40 animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200">
              <img
                src={dummyAvatarUrl}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Logged in as</p>
              <p className="text-sm font-bold text-slate-800 capitalize">
                {username}
              </p>
            </div>
          </div>

          {!isCartPage && (
            <div className="relative flex items-center w-full h-10 rounded-lg bg-[#F1F4FC] overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 bg-transparent pr-2"
                type="text"
                placeholder="Search products..."
                defaultValue={currentSearch}
                onChange={handleSearchChange}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Navigasi Halaman
            </span>
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-blue-700 py-2 px-3 rounded-lg bg-blue-50 transition-colors"
            >
              Shop / Dashboard
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm font-semibold text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>Wishlist Saya</span>
              {wishlistCount > 0 && (
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full py-2.5 px-4 bg-red-50 text-red-600 font-semibold text-sm rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Logout dari Akun
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
