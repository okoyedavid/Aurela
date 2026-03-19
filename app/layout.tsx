import { Toaster } from "@/components/ui/toast";
import Provider from "@/contexts/Providers";
import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./animations.css";
import "./globals.css";

const playfair = Space_Grotesk({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Manrope({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auvé",
  description: "Where Simplicity Meets Sophistication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Provider>
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  );
}
