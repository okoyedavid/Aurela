"use client";

import ProductCard from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { curatedCollections } from "@/data/collections";
import { selectAllProducts } from "@/features/products/productsSlice";
import { Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

type Collection = (typeof curatedCollections)[keyof typeof curatedCollections];
export default function CollectionClient({
  collection,
}: {
  collection: Collection;
}) {
  const products = useSelector(selectAllProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const collectionProducts = useMemo(
    () =>
      products.filter((product) => {
        const configuredCategories =
          "categories" in collection
            ? (collection.categories as readonly string[])
            : [];
        return (
          (!configuredCategories.length ||
            configuredCategories.includes(product.category)) &&
          product.tags.some((tag) =>
            (collection.tags as readonly string[]).includes(tag),
          )
        );
      }),
    [collection, products],
  );
  const categories = [
    ...new Set(collectionProducts.map((product) => product.category)),
  ];
  const filtered = collectionProducts
    .filter(
      (product) =>
        (!query ||
          `${product.name} ${product.brand}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (category === "all" || product.category === category),
    )
    .sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : sort === "rating"
            ? b.rating - a.rating
            : Number(b.featured) - Number(a.featured),
    );
  return (
    <main className="bg-background">
      <section className="px-3 pb-10 sm:px-5 lg:px-6">
        <div className="relative mx-auto min-h-[420px] max-w-7xl overflow-hidden rounded-4xl bg-primary text-primary-foreground lg:min-h-[520px] lg:rounded-[2.5rem]">
          <Image
            fill
            src={collection.image}
            alt={collection.name}
            priority
            sizes="(max-width:1280px) 100vw, 1280px"
            className="object-cover object-[20%_10%]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-scrim/90 via-scrim/25 to-scrim/5 lg:bg-linear-to-r lg:from-scrim/85 lg:via-scrim/30 lg:to-scrim/5" />
          <div className="relative flex min-h-[520px] max-w-3xl flex-col justify-end p-7 sm:p-10 lg:min-h-[620px] lg:p-14">
            <p className="text-xs uppercase tracking-[.28em] text-scrim-foreground/65">
              {collection.eyebrow}
            </p>
            <h1 className="mt-5 text-5xl font-semibold text-scrim-foreground leading-[.9] tracking-[-.06em] sm:text-7xl lg:text-8xl">
              {collection.name}
            </h1>
            <p className="mt-6 max-w-xl leading-7 text-scrim-foreground/70">
              {collection.description}
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-3 pb-20 sm:px-5 lg:px-6">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[.24em] text-muted-foreground">
              Curated selection
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-.04em] sm:text-5xl">
              Explore the collection
            </h2>
          </div>
          <span className="text-sm text-muted-foreground">
            {filtered.length} pieces
          </span>
        </div>
        <div className="mb-10 grid gap-3 rounded-[1.5rem] border border-border bg-card p-3 sm:grid-cols-[1fr_220px_190px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search collection"
              aria-label="Search collection"
              className="h-11 rounded-xl pl-11"
            />
          </label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Category"
            className="h-11 rounded-xl border border-border bg-background px-4 text-sm"
          >
            <option value="all">All categories</option>
            {categories.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort products"
            className="h-11 rounded-xl border border-border bg-background px-4 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="rating">Top rated</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>
        {filtered.length ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} id={product.id} />
            ))}
          </div>
        ) : (
          <div className="rounded-4xl bg-muted p-12 text-center text-muted-foreground">
            No pieces match these filters.
          </div>
        )}
      </section>
    </main>
  );
}
