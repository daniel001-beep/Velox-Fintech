import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatAssistant from "./components/AIChatAssistant";
import { Providers } from "./components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velox - Premium E-Commerce Store",
  description: "Shop our curated collection of premium products. Free shipping and secure checkout.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex grow flex-col">
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
            <AIChatAssistant />
          </div>
        </Providers>
      </body>
    </html>
  );
}