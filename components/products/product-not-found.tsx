"use client";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/site-footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
export default function ProductNotFound() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-10 md:px-8">
        <div className="w-full rounded-[32px] p-8 text-center md:p-12">
          {/* Changed: not-found state now matches the softer editorial product page treatment. */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f1ece4]">
            <Search className="h-6 w-6 text-[#5f5a53]" />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a847a]">
              Product Lookup
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#171717]">
              Product Not Found
            </h1>
            <p className="mx-auto max-w-md text-sm leading-7 text-[#716b64]">
              The product tied to this demo selection is unavailable right now.
              Choose another product or return to the catalog.
            </p>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="rounded-full bg-[#171717] px-6 text-white hover:bg-black"
            >
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
      <Footer />
    </div>
  );
}
