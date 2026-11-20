import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/site-footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
