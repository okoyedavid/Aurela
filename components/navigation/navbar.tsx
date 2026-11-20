"use client";

import Navigation from "@/components/navigation/desktop-navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { selectCartCount } from "@/features/cart/cart-slice";
import { Heart, Menu, ShoppingBag, ShoppingCart } from "lucide-react";
import { selectWishlistIds } from "@/features/wishlist/wishlist-slice";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useSelector } from "react-redux";
import { NavSearch } from "./nav-search";

const mobileLinks = [
  { href: "/products", label: "All products" },
  { href: "/new-arrivals", label: "New arrivals" },
  { href: "/sale", label: "Sale" },
  { href: "/category/womens-clothing", label: "Women" },
  { href: "/category/mens-clothing", label: "Men" },
  { href: "/category/kids-clothing", label: "Kids" },
  { href: "/category/shoes", label: "Footwear" },
  { href: "/category/accessories", label: "Accessories" },
  { href: "/reels", label: "Discover" },
  { href: "/reels/3d", label: "3D Runway" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/track-order", label: "Track order" },
];

const subscribeToHydration = () => () => {};

export default function Navbar() {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistIds).length;

  useEffect(() => {
    let ticking = false;
    function handleScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
        ticking = false;
      });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full overflow-x-clip bg-background/95 px-3 py-2.5 backdrop-blur-md sm:px-5 lg:px-6 ${isScrolled ? "border-b border-border shadow-sm" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-4 lg:gap-8">
          <Link href="/" className="flex shrink-0 items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
            <Image src="/aurela-logo.png" alt="" width={30} height={30} className="rounded-lg" priority />
            <span>Aurela</span>
          </Link>
          <div className="hidden lg:block">
            <Navigation />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-4">
          <NavSearch />
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-medium transition hover:bg-accent"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Sign up
            </Link>
          </div>
          <Link href="/wishlist" className="relative hidden h-10 w-10 place-items-center rounded-full hover:bg-accent sm:grid" aria-label="Wishlist"><Heart className="h-5 w-5 text-muted-foreground" />{hydrated && wishlistCount > 0 && <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{wishlistCount}</span>}</Link>
          <Link
            href="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-accent"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            {hydrated && cartCount > 0 && (
              <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation"
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[70vw] gap-0 border-border bg-background p-0 text-foreground"
            >
              <SheetHeader className="border-b border-border px-6 py-6 text-left">
                <SheetTitle className="flex items-center gap-3 text-2xl">
                  <ShoppingBag className="h-5 w-5" /> Aurela.
                </SheetTitle>
                <SheetDescription>Explore the collection</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col p-4">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl px-4 py-3 text-lg font-medium transition hover:bg-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto grid gap-2 border-t border-border p-5">
                <Link
                  href="/login"
                  className="rounded-full border border-border px-5 py-3 text-center text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground"
                >
                  Create account
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
