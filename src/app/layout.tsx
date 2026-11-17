import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "NextShop - Đại Siêu Thị Trực Tuyến Đa Ngành Hàng",
  description: "Mua sắm thiết bị gia dụng, thời trang & phụ kiện, đồ điện tử công nghệ chính hãng với ưu đãi tốt nhất và giao hàng hỏa tốc trong 2 giờ.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f1f5f9] text-slate-900 overflow-x-hidden w-full">
        <AuthProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
