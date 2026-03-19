"use client";
import Navigation from "@/components/Navigation";
import { ShoppingCart } from "lucide-react";
import { NavSearch } from "./navigation/NavSearch";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/features/Cart/cartSlice";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 10;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cartCount = useSelector(selectCartCount);

  return (
    <header
      className={`${
        isScrolled && "shadow-sm bg-background"
      } sticky w-full top-0 z-50 px-6 py-2.5`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold text-gray-900">Auvé</h1>
          </Link>
          <Navigation />
        </div>
        <div className="flex items-center space-x-4">
          <NavSearch />{" "}
          <Link href={"/cart"} className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
