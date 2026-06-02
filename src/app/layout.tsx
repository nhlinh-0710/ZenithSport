import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastContainer from "@/components/ui/ToastContainer";
import BackToTop from "@/components/ui/BackToTop";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { ToastProvider } from "@/contexts/toast-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zenith Sport | Đồ thể thao chính hãng",
  description: "Cửa hàng đồ thể thao hàng đầu Việt Nam. Giày, áo, quần, phụ kiện thể thao chính hãng từ Nike, Adidas, và nhiều thương hiệu khác.",
  keywords: "đồ thể thao, giày thể thao, Nike, Adidas, quần áo thể thao, phụ kiện thể thao",
  openGraph: {
    title: "Zenith Sport - Đồ thể thao chính hãng",
    description: "Cửa hàng đồ thể thao hàng đầu Việt Nam",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <Navbar />
                <main className="flex-1 pt-16 sm:pt-20">{children}</main>
                <Footer />
                <ToastContainer />
                <BackToTop />
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
