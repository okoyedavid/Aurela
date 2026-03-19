import { ProductPage } from "@/types/products";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Navigation({ product }: ProductPage) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link href="/shop" className="hover:text-foreground">
        Shop
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link
        href={`/category/${product.category
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
        className="hover:text-foreground"
      >
        {product.category}
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-foreground">{product.name}</span>
    </nav>
  );
}
