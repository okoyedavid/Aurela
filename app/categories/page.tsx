"use client";

import { categories } from "@/data/products";
import { selectAllProducts } from "@/features/products/productsSlice";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function CategoriesPage() {
  const products = useSelector(selectAllProducts);
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          productCount: products.filter(
            (product) => product.category === category.name,
          ).length,
        }))
        .filter(
          (category) =>
            !query ||
            `${category.name} ${category.description}`
              .toLowerCase()
              .includes(query.toLowerCase()),
        ),
    [products, query],
  );
  const featured = visible.find((category) => category.featured) ?? visible[0];
  const remaining = query
    ? visible
    : visible.filter((category) => category.slug !== featured?.slug);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-3 pb-12 sm:px-5 lg:px-6">
        <div className="relative mx-auto min-h-[480px] max-w-7xl overflow-hidden rounded-4xl bg-primary text-scrim-foreground lg:min-h-[600px] lg:rounded-[2.5rem]">
          <Image
            fill
            src="/products/winterlook.jpeg"
            alt="Aurela collections"
            priority
            sizes="(max-width:1280px) 100vw, 1280px"
            className="object-cover object-[20%_5%]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-scrim/90 via-scrim/35 to-scrim/10 lg:bg-linear-to-r lg:from-scrim/90 lg:via-scrim/40 lg:to-scrim/5" />
          <div className="relative flex min-h-[480px] max-w-3xl flex-col justify-end p-7 sm:p-10 lg:min-h-[600px] lg:p-14">
            <p className="text-xs uppercase tracking-[.28em] text-scrim-foreground/65">
              Explore Aurela
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[.9] tracking-[-.06em] sm:text-7xl lg:text-8xl">
              Every world of personal style.
            </h1>
            <p className="mt-6 max-w-xl leading-7 text-scrim-foreground/70">
              Move through clothing, footwear, accessories and considered
              finishing pieces from sellers across one shared marketplace.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 pb-20 sm:px-5 lg:px-6">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.24em] text-muted-foreground">
              Browse the marketplace
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-.04em] sm:text-5xl">
              All categories
            </h2>
          </div>
          <label className="relative block w-full sm:max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a category"
              className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-5 text-sm outline-none focus:border-ring"
            />
          </label>
        </div>

        {featured && !query && (
          <Link
            href={`/category/${featured.slug}`}
            className="group relative mb-4 grid min-h-[440px] overflow-hidden rounded-4xl bg-primary dark:bg-muted text-scrim-foreground lg:grid-cols-2"
          >
            <div className="relative min-h-[300px] lg:order-2 overflow-hidden">
              <Image
                fill
                src={featured.image}
                alt={`${featured.name} collection`}
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-scrim/40 to-transparent lg:bg-linear-to-r" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:order-1 lg:p-14">
              <p className="text-xs uppercase tracking-[.24em] text-scrim-foreground/55">
                Featured category
              </p>
              <h3 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
                {featured.name}
              </h3>
              <p className="mt-5 max-w-md leading-7 text-scrim-foreground/65">
                {featured.description}
              </p>
              <div className="mt-8 flex items-center gap-3 text-sm">
                <span>{featured.productCount} pieces</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        )}

        {remaining.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {remaining.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group relative min-h-[390px] overflow-hidden rounded-[1.75rem] bg-scrim text-scrim-foreground"
              >
                <Image
                  fill
                  src={category.image}
                  alt={`${category.name} collection`}
                  sizes="(max-width:640px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-scrim/85 via-scrim/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6">
                  <div>
                    <p className="text-xs text-scrim-foreground/55">
                      {category.productCount} pieces
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold">
                      {category.name}
                    </h3>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-scrim-foreground/30 bg-primary/15 backdrop-blur">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-4xl bg-muted p-12 text-center">
            <h3 className="text-2xl font-semibold">No categories found.</h3>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-4 text-sm underline underline-offset-4"
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
