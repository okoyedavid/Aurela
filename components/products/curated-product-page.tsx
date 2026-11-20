"use client";

import ProductCard from "./product-card";
import { selectAllProducts } from "@/features/products/products-slice";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function CuratedProductPage({ mode }: { mode: "new" | "sale" }) {
  const products = useSelector(selectAllProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState(mode === "new" ? "newest" : "discount");
  const eligible = useMemo(() => {
    const newestTimestamp = Math.max(
      ...products.map((product) => new Date(product.createdAt).getTime()),
    );
    return products.filter((product) =>
      mode === "sale"
        ? product.onSale &&
          !!product.originalPrice &&
          product.originalPrice > product.price
        : newestTimestamp - new Date(product.createdAt).getTime() <= 86_400_000,
    );
  }, [mode, products]);
  const categories = [...new Set(eligible.map((product) => product.category))];
  const filtered = eligible
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
          : sort === "discount"
            ? (b.originalPrice! - b.price) / b.originalPrice! -
              (a.originalPrice! - a.price) / a.originalPrice!
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  const copy =
    mode === "new"
      ? {
          eyebrow: "Published in the last 24 hours",
          title: "New arrivals.",
          description:
            "The latest pieces approved for Aurela’s shared marketplace, ordered by publication time.",
        }
      : {
          eyebrow: "Verified price reductions",
          title: "The sale edit.",
          description:
            "Only products whose current price is lower than their recorded original price appear here.",
        };
  return (
    <main className="min-h-screen bg-background px-3 py-10 text-foreground sm:px-5 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[.26em] text-muted-foreground">
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-[.9] tracking-[-.06em] sm:text-7xl lg:text-8xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">
            {copy.description}
          </p>
        </div>
        <div className="my-10 grid gap-3 rounded-[1.5rem] border border-border bg-card p-3 sm:grid-cols-[1fr_220px_190px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search this edit"
              aria-label="Search products"
              className="h-11 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm outline-none"
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
            aria-label="Sort"
            className="h-11 rounded-xl border border-border bg-background px-4 text-sm"
          >
            {mode === "new" && <option value="newest">Newest first</option>}
            {mode === "sale" && (
              <option value="discount">Largest discount</option>
            )}
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>
        <div className="mb-7 text-sm text-muted-foreground">
          {filtered.length} pieces
        </div>
        {filtered.length ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} id={product.id} />
            ))}
          </div>
        ) : (
          <div className="rounded-4xl bg-muted p-12 text-center text-muted-foreground">
            No products match these filters.
          </div>
        )}
      </div>
    </main>
  );
}
