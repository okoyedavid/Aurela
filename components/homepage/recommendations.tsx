import { selectHotDrops } from "@/features/products/products-slice";
import Link from "next/link";
import { useSelector } from "react-redux";
import ProductCard from "../products/product-card";

export default function Recommendations() {
  const products = useSelector(selectHotDrops).slice(0, 4);
  return (
    <section className="mx-auto max-w-7xl px-3 py-14 sm:px-5 lg:px-6 lg:py-20">
      <div className="mb-8 flex items-end justify-between gap-5"><div><p className="text-xs uppercase tracking-[.26em] text-muted-foreground">Selected for you</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Aurela recommends</h2></div><Link href="/products" className="shrink-0 text-sm font-medium underline underline-offset-4">View all</Link></div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">{products.map(product => <ProductCard key={product.id} id={product.id} />)}</div>
    </section>
  );
}
