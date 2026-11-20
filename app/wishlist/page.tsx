"use client";

import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { selectAllProducts } from "@/features/products/products-slice";
import {
  selectWishlistIds,
  wishlistCleared,
} from "@/features/wishlist/wishlist-slice";
import { Heart, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function WishlistPage() {
  const ids = useSelector(selectWishlistIds);
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("saved");
  const saved = useMemo(
    () =>
      ids
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is NonNullable<typeof product> => !!product),
    [ids, products],
  );
  const categories = [...new Set(saved.map((product) => product.category))];
  const filtered = saved
    .filter(
      (product) =>
        (!query ||
          `${product.name} ${product.brand}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (category === "all" || product.category === category) &&
        (availability === "all" ||
          (availability === "available" ? product.inStock : !product.inStock)),
    )
    .sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : ids.indexOf(a.id) - ids.indexOf(b.id),
    );

  return (
    <main className="min-h-[70vh] bg-background px-3 py-10 text-foreground sm:px-5 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.26em] text-muted-foreground">
              Your private edit
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
              Saved pieces.
            </h1>
            <p className="mt-3 text-muted-foreground">
              {ids.length} piece{ids.length === 1 ? "" : "s"} saved on this
              device.
            </p>
          </div>
          {ids.length > 0 && (
            <Button variant="ghost" onClick={() => dispatch(wishlistCleared())}>
              Clear wishlist
            </Button>
          )}
        </div>
        {ids.length === 0 ? (
          <div className="my-20 rounded-4xl bg-muted p-10 text-center sm:p-16">
            <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
            <h2 className="mt-6 text-3xl font-semibold">Nothing saved yet.</h2>
            <p className="mt-3 text-muted-foreground">
              Use the heart on any product to build your personal edit.
            </p>
            <Button asChild className="mt-7 rounded-full px-7">
              <Link href="/products">Discover products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="my-10 grid gap-3 rounded-[1.5rem] border border-border bg-card p-3 sm:grid-cols-2 lg:grid-cols-[1fr_220px_180px_180px]">
              <label className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search saved pieces"
                  className="h-11 rounded-xl pl-11"
                />
              </label>
              <Filter
                value={category}
                onChange={setCategory}
                label="Category"
                options={[
                  ["all", "All categories"],
                  ...categories.map((value) => [value, value]),
                ]}
              />
              <Filter
                value={availability}
                onChange={setAvailability}
                label="Availability"
                options={[
                  ["all", "Any availability"],
                  ["available", "Available"],
                  ["unavailable", "Unavailable"],
                ]}
              />
              <Filter
                value={sort}
                onChange={setSort}
                label="Sort"
                options={[
                  ["saved", "Recently saved"],
                  ["price-low", "Price: low to high"],
                  ["price-high", "Price: high to low"],
                ]}
              />
            </div>
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" /> {filtered.length}{" "}
              results
            </div>
            {filtered.length ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} id={product.id} />
                ))}
              </div>
            ) : (
              <div className="rounded-4xl bg-muted p-12 text-center">
                <h2 className="text-2xl font-semibold">
                  No saved pieces match.
                </h2>
                <Button
                  variant="outline"
                  className="mt-5 rounded-full"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                    setAvailability("all");
                  }}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function Filter({
  value,
  onChange,
  label,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: string[][];
}) {
  return (
    <label className="sr-only">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="not-sr-only h-11 w-full rounded-xl border border-border bg-background px-4 text-sm"
      >
        {options.map(([optionValue, text]) => (
          <option key={optionValue} value={optionValue}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
