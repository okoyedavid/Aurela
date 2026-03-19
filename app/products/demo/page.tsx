"use client";

import Navbar from "@/components/navBar";
import Footer from "@/components/navigation/Footer";
import ProductNotFound from "@/components/products/ProductNotFound";
import ProductVariantPicker from "@/components/products/ProductVariantPicker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  selectProductById,
  selectRelatedProducts,
} from "@/features/products/productsSlice";
import { RootState } from "@/store/store";
import {
  ChevronLeft,
  CircleCheck,
  Heart,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

const ratingRows = [
  { stars: 5, value: 82 },
  { stars: 4, value: 48 },
  { stars: 3, value: 24 },
  { stars: 2, value: 10 },
  { stars: 1, value: 5 },
];

const shippingItems = [
  {
    title: "Free DHL",
    caption: "Delivery in 3-5 working days",
    icon: Truck,
  },
  {
    title: "Regular Package",
    caption: "Packed with garment protection",
    icon: ShoppingBag,
  },
  {
    title: "No Extra Shipping Fee",
    caption: "Applied automatically at checkout",
    icon: CircleCheck,
  },
  {
    title: "30-Day Return",
    caption: "Easy exchange or refund policy",
    icon: ShieldCheck,
  },
];

export default function ProductsDemoPage() {
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const product = useSelector((state: RootState) =>
    selectProductById(state, "wer"),
  );

  const relatedProducts = useSelector((state: RootState) =>
    selectRelatedProducts(state, "4", {
      matchBy: "category",
      excludeCurrent: true,
      sortBy: "popularity",
      fallback: true,
    }),
  );

  const variantGroups = product
    ? product.variants.reduce<Record<string, typeof product.variants>>(
        (groups, variant) => {
          if (!groups[variant.type]) {
            groups[variant.type] = [];
          }

          groups[variant.type].push(variant);
          return groups;
        },
        {},
      )
    : {};

  if (!product) return <ProductNotFound />;

  return (
    <main className="min-h-screen text-[#171717]">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-7">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-[#77736c]">
              <ChevronLeft className="h-4 w-4" />
              <span>Home</span>
              <span>/</span>
              <span>Product detail</span>
            </div>

            <div className="overflow-hidden rounded-[26px] border border-[#ebe7de] bg-[#efede8]">
              <div className="relative aspect-[1.03/1]">
                {/* Changed: large editorial hero image to match the reference gallery balance. */}
                <Image
                  fill
                  src={product.image}
                  alt="Loose fit hoodie front view"
                  className="object-cover object-top-left"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className={`relative overflow-hidden rounded-2xl border ${
                    index === 0
                      ? "border-[#1e1e1e]"
                      : "border-[#ece8df] hover:border-[#c9c2b5]"
                  } bg-[#f1eee8]`}
                >
                  <div className="relative aspect-square">
                    <Image
                      fill
                      src={image}
                      alt={`Loose fit hoodie thumbnail ${index + 1}`}
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-1">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                {product.badge && (
                  <Badge
                    variant="outline"
                    className="rounded-full border-[#ddd6ca] bg-[#faf7f1] px-3 py-1 text-[11px] uppercase tracking-[0.24em]"
                  >
                    {product.badge}
                  </Badge>
                )}
                <h1 className="text-3xl font-semibold tracking-[-0.04em] md:text-[2rem]">
                  {product.name}
                </h1>
                <div className="text-2xl font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price)}
                </div>
              </div>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="rounded-full border-[#e2ddd3] bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3 border-y border-[#ece7de] py-3 text-sm text-[#6f6b64]">
              <div className="flex items-center gap-1 text-[#f2a531]">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-current"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span>{product.rating} rating</span>
              <span className="text-[#c5bfb3]">/</span>
              <span>{product.reviewCount} reviews</span>
            </div>

            {Object.keys(variantGroups).length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm font-medium text-[#4f4a43]">
                    Product Options
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#8a847b]">
                    {Object.keys(variantGroups).length} selectors
                  </div>
                </div>
                {/* Changed: demo page now renders the real variant groups instead of a fake size-only strip. */}
                <div className="rounded-[26px] border border-[#ece7de] bg-white p-4 md:p-5">
                  <ProductVariantPicker
                    variants={product.variants}
                    selectedVariants={selectedVariants}
                    onVariantChange={setSelectedVariants}
                    className="space-y-5"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Changed: action row mirrors the reference with one strong CTA and a compact secondary action. */}
              <Button className="h-12 flex-1 rounded-full bg-[#171717] text-white hover:bg-black">
                Add To Cart
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-12 w-12 rounded-full border-[#e2ddd3] bg-white"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 border-t border-[#ece7de] pt-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#59554f]">
                Description
              </h2>
              <p className="max-w-xl text-sm leading-7 text-[#6f6b64]">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 border-t border-[#ece7de] pt-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#59554f]">
                Shipping
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {shippingItems.map(({ title, caption, icon: Icon }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-[#ece7de] bg-white px-4 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-[#f6f2eb] p-2 text-[#1b1b1b]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-semibold">{title}</div>
                        <p className="text-xs leading-5 text-[#78736c]">
                          {caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 border-t border-[#ece7de] pt-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-4">
            <div className="text-lg font-semibold">Rating &amp; Reviews</div>
            <div className="flex items-end gap-3">
              <div className="text-6xl font-semibold tracking-[-0.08em]">
                {product.rating.toFixed(1).replace(".", ",")}
              </div>
              <div className="pb-2 text-sm text-[#7a756d]">/ 5</div>
            </div>
            <div className="text-sm text-[#7a756d]">
              ({product.reviewCount} Close Reviews)
            </div>

            <div className="space-y-3 pt-2">
              {ratingRows.map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <div className="w-8 text-sm font-medium">{row.stars}</div>
                  <Star className="h-4 w-4 fill-[#f2b344] text-[#f2b344]" />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#ece7de]">
                    <div
                      className="h-full rounded-full bg-[#171717]"
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5 rounded-[28px] border border-[#ece7de] bg-white px-5 py-5 md:px-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="text-lg font-semibold">Alex Moulder</div>
                <div className="flex items-center gap-1 text-[#f2b344]">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-current"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-[#8a847b]">
                12 Mar 2026
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-[#6d675f]">
              &quot;The fabric feels expensive and the silhouette sits exactly
              the way I wanted. It has enough structure to look intentional
              without feeling stiff, which makes it one of those pieces you end
              up wearing far more often than expected.&quot;
            </p>

            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  fill
                  src="/products/model.jpeg"
                  alt="Reviewer avatar"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-semibold">Verified Buyer</div>
                <div className="text-xs text-[#8a847b]">
                  Purchases modern essentials weekly
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 border-t border-[#ece7de] pt-10">
          <h2 className="text-center text-4xl font-semibold tracking-[-0.05em]">
            You might also like
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <article key={item.name} className="space-y-3">
                <div className="relative aspect-[0.95/1] overflow-hidden rounded-[24px] bg-[#ece7de]">
                  <Image
                    fill
                    src={item.image}
                    alt={item.name}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-[#79746c]">
                    <span className="font-semibold text-[#1b1b1b]">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.price)}
                    </span>
                    <span>{item.tags[0]}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
