import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-24 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        <div>
          <Link href="/dashboard" className="text-[#0044CC] font-extrabold text-xl tracking-wide">
            LITE
          </Link>
          <p className="text-xs text-gray-400 mt-1.5">
            &copy; {new Date().getFullYear()} LITE E-Commerce. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end text-xs text-gray-500">
          <p>
            Dibuat menggunakan <span className="font-bold text-slate-800">Next.js</span> dan <span className="font-bold text-slate-800">FakeStoreAPI</span>
          </p>
          <p className="mt-1">
            Developed by <span className="font-bold text-[#0044CC]">Ardhani Ahlan</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;