import { ArrowDown, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CategoryPage } from "@/types/category";

export default function CategoryHeader({ category }: CategoryPage) {
  return (
    <section className="px-3 pb-8 sm:px-5 lg:px-6">
      <div className="relative mx-auto min-h-[420px] max-w-7xl overflow-hidden rounded-[1.75rem] bg-primary text-primary-foreground sm:min-h-[480px] lg:min-h-[520px] lg:rounded-[2.5rem]">
        <Image fill src={category.image} alt={`${category.name} collection`} priority sizes="(max-width:1280px) 100vw, 1280px" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-primary/10 lg:bg-gradient-to-r lg:from-primary/85 lg:via-primary/30 lg:to-primary/5" />
        <div className="relative flex min-h-[420px] flex-col p-6 sm:min-h-[480px] sm:p-10 lg:min-h-[520px] lg:p-14">
          <Link href="/products" className="inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[.2em] text-primary-foreground/70 transition hover:text-primary-foreground"><ArrowLeft className="h-4 w-4" /> All products</Link>
          <div className="mt-auto max-w-2xl">
            <p className="text-xs uppercase tracking-[.28em] text-primary-foreground/65">Aurela collection</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[.92] tracking-[-.06em] sm:text-7xl lg:text-8xl">{category.name}</h1>
            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-lg text-sm leading-7 text-primary-foreground/75 sm:text-base">{category.description}</p>
              <a href="#collection" className="inline-flex shrink-0 items-center gap-2 text-xs uppercase tracking-[.2em] text-primary-foreground/70">Explore <span className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/30"><ArrowDown className="h-4 w-4" /></span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
