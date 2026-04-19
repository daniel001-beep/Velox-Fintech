import type { Metadata } from "next";
import { Providers } from "@/app/components/Providers";
import "./fintech.css";

export const metadata: Metadata = {
  title: "Velox Fintech - Enterprise Ledger System",
  description: "Enterprise-grade financial infrastructure with real-time reconciliation and AI-powered fraud detection.",
};

export default function FintechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
