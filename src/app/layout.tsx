import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoadingWrapper from "@/components/layout/LoadingWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plak - Copyright-Free Music",
  description: "Discover and listen to copyright-free music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ fontFamily: 'Magtis, sans-serif' }}>
        <LoadingWrapper>
          {children}
        </LoadingWrapper>
      </body>
    </html>
  );
}
