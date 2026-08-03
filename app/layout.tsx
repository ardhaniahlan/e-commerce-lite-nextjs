import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LITE | Modern E-Commerce",
  description: "Temukan produk-produk terbaik dengan harga terjangkau. Belanja aman, cepat, dan terpercaya.",
  keywords: ["ecommerce", "belanja online", "lite shop", "baju pria", "baju wanita"],
  authors: [{ name: "Ardhani Ahlan" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}