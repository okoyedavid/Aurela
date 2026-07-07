import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CheckoutCancelledPage() {
  return (
    <main className="grid min-h-[calc(100dvh-64px)] place-items-center bg-muted px-4 py-10 text-foreground">
      <section className="w-full max-w-2xl rounded-4xl border border-border bg-card p-7 text-center sm:p-12 lg:rounded-[2.5rem] lg:p-16">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted">
          <RefreshCw className="h-6 w-6" />
        </span>
        <p className="mt-9 text-xs uppercase tracking-[.26em] text-muted-foreground">
          Checkout paused
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
          Your selection is still waiting.
        </h1>
        <p className="mx-auto mt-6 max-w-lg leading-7 text-muted-foreground">
          No order was placed and no payment was processed. Return to checkout
          when you are ready, or review your bag first.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="h-12 rounded-full px-7">
            <Link href="/checkout">Return to checkout</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-full px-7">
            <Link href="/cart">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Review bag
            </Link>
          </Button>
        </div>
        <Link
          href="/products"
          className="mt-7 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Continue shopping
        </Link>
      </section>
    </main>
  );
}
