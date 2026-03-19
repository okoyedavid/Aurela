"use client";
import { Button } from "@/components/ui/button";
import { selectProductById } from "@/features/products/productsSlice";
import { RootState } from "@/store/store";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Navigation from "./navigation";
import ProductDescription from "./ProductDescription";
import ProductDetails from "./ProductDetails";
import ProductGallery from "./ProductGallery";
import RelatedProducts from "./RelatedProducts";

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
              <Link href="/shop">
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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Navigation product={product} />
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductDescription product={product} />
        </div>

        <ProductDetails product={product} />
        <RelatedProducts id={id} />
      </div>
    </div>
  );
}
