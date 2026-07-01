import { ProductPage } from "@/types/products";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Navigation({ product }: ProductPage) {
  const categorySlug: Record<string, string> = {
    "Women's Clothing": "womens-clothing",
    "Men's Clothing": "mens-clothing",
    "Kids' Clothing": "kids-clothing",
    Shoes: "shoes",
    Accessories: "accessories",
    Bags: "bags",
    Jewelry: "jewelry",
  };
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link href="/products" className="hover:text-foreground">
        Shop
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link
        href={`/category/${categorySlug[product.category] ?? product.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        className="hover:text-foreground"
      >
        {product.category}
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="max-w-40 truncate text-foreground sm:max-w-none">{product.name}</span>
    </nav>
  );
}
