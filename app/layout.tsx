import { Toaster } from "@/components/ui/toast";
import Provider from "@/contexts/app-providers";
import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./animations.css";
import "./globals.css";
import DashboardThemeProvider from "@/components/dashboard/dashboard-theme-provider";

const playfair = Space_Grotesk({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Manrope({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurela",
  description: "Where Simplicity Meets Sophistication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Provider>
          <DashboardThemeProvider>
            <Toaster />
            {children}
          </DashboardThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
