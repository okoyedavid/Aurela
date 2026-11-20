"use client";

import { selectAllProducts } from "@/features/products/products-slice";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function Subcategories({ category }: { category: string }) {
  const pathname = usePathname();
  const products = useSelector((state: RootState) => selectAllProducts(state));
  const items = Array.from(new Set(products.filter(product => product.category === category).map(product => product.subcategory))).map(name => {
    const matching = products.filter(product => product.category === category && product.subcategory === name);
    return { name, count: matching.length, image: matching[0]?.image };
  });

  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-3 py-8 sm:px-5 lg:px-6 lg:py-12">
      <div className="mb-6 flex items-end justify-between"><div><p className="text-xs uppercase tracking-[.24em] text-muted-foreground">Refine the collection</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.03em] sm:text-3xl">Shop by category</h2></div><Link href={pathname} className="text-sm text-muted-foreground underline underline-offset-4">View all</Link></div>
      <div className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {items.map(item => (
          <Link key={item.name} href={`${pathname}?subcategory=${encodeURIComponent(item.name)}`} className="group w-[72vw] max-w-[280px] shrink-0 snap-start sm:w-auto sm:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-muted"><Image fill src={item.image} alt={`${item.name} collection`} sizes="(max-width:640px) 72vw, 25vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" /></div>
            <div className="mt-3 flex items-center justify-between px-1"><h3 className="font-medium">{item.name}</h3><span className="text-xs text-muted-foreground">{item.count} pieces</span></div>
          </Link>
        ))}
      </div>
    </section>
  );
}
