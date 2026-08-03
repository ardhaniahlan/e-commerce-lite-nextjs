import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  const cartItemsCount = 2;
  const dummyAvatarUrl = "https://ui-avatars.com/api/?name=Ardhani+Ahlan&background=0D8ABC&color=fff";

  return (
    <nav className="w-full bg-white border-b border-gray-100 h-16 flex items-center px-4 md:px-8 justify-between sticky top-0 z-50">
      
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center text-blue-700">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <span className="text-blue-700 font-bold text-xl tracking-wide">LITE</span>
        </Link>

        <div className="hidden md:flex items-center">
          <Link href="/shop" className="text-blue-700 font-semibold text-sm">
            Shop
          </Link>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-8 hidden md:block">
        <div className="relative flex items-center w-full h-10 rounded-lg bg-[#F1F4FC] overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <div className="grid place-items-center h-full w-12 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 bg-transparent pr-2"
            type="text"
            id="search"
            placeholder="Search products..."
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        
        <Link href="/cart" className="relative p-1 text-gray-600 hover:text-blue-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
              {cartItemsCount}
            </span>
          )}
        </Link>

        <div className="w-px h-8 bg-gray-200"></div>

        <button className="h-9 w-9 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500">
          <img 
            src={dummyAvatarUrl} 
            alt="User Avatar" 
            className="h-full w-full object-cover"
          />
        </button>
      </div>

    </nav>
  );
};

export default Navbar;