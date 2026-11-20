"use client";
import { Button } from "@/components/ui/button";
import { selectProductById } from "@/features/products/products-slice";
import { RootState } from "@/store/store";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Navigation from "./navigation";
import ProductDescription from "./product-description";
import ProductDetails from "./product-details";
import ProductGallery from "./product-gallery";
import RelatedProducts from "./related-products";

export default function ProductClient({ id }: { id: string }) {
  const product = useSelector((state: RootState) =>
    selectProductById(state, id)
  );

  if (!product) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-10">
        <div className="w-full rounded-[32px] border border-[#e8e2d7] bg-[#fcfbf8] p-8 text-center shadow-[0_20px_65px_rgba(18,18,18,0.08)] md:p-12">
          {/* Changed: upgraded the missing-product UI to match the calmer editorial storefront styling. */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a847a]">
              Product Lookup
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#171717]">
              Product Not Found
            </h1>
            <p className="mx-auto max-w-md text-sm leading-7 text-[#716b64]">
              The product you&apos;re looking for doesn&apos;t exist or is no
              longer available in this collection.
            </p>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-[#171717] px-6 text-white hover:bg-black">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back To Products
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-[#d9d1c4] bg-white px-6"
            >
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-5 lg:px-6 lg:py-8">
        <Navigation product={product} />
        <Button asChild variant="ghost" className="mb-6"><Link href="/products"><ArrowLeft className="mr-2 h-4 w-4" />Back to collection</Link></Button>

        <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,.65fr)] lg:items-start lg:gap-14">
          <ProductGallery product={product} />
          <div className="lg:sticky lg:top-24"><ProductDescription product={product} /></div>
        </div>

        <ProductDetails product={product} />
        <RelatedProducts id={id} />
      </div>
    </div>
  );
}
