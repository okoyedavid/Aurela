"use client";
import SupportPage from "@/components/support/support-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, PackageCheck, Search, Truck } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function OrderStatusPage() {
  const [reference, setReference] = useState("");
  const [found, setFound] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setFound(true);
  };
  return (
    <SupportPage
      title="Find your order."
      description="Use this quick lookup for a status summary. Open detailed tracking when you need the full sequence of seller and carrier events."
    >
      <form
        onSubmit={submit}
        className="grid gap-3 rounded-4xl border border-border bg-card p-6 sm:grid-cols-[1fr_1fr_auto] sm:p-8"
      >
        <label className="text-sm font-medium">
          Order reference
          <Input
            required
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            placeholder="AR-12345678"
            className="mt-2 h-12 rounded-xl"
          />
        </label>
        <label className="text-sm font-medium">
          Email address
          <Input
            required
            type="email"
            placeholder="you@example.com"
            className="mt-2 h-12 rounded-xl"
          />
        </label>
        <Button type="submit" className="h-12 self-end rounded-full px-7">
          <Search className="mr-2 h-4 w-4" />
          Find order
        </Button>
      </form>
      {found && (
        <section className="mt-7 grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="rounded-4xl border border-border bg-card p-7 sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-muted-foreground">
                  {reference.toUpperCase()}
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Being prepared</h2>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                <PackageCheck className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-2/5 rounded-full bg-primary" />
            </div>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <span>Order received</span>
              <span>Delivered</span>
            </div>
            <p className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <Truck className="h-5 w-5" />
              Next expected event: carrier handoff
            </p>
          </div>
          <div className="rounded-4xl bg-primary p-7 text-primary-foreground">
            <h2 className="text-xl font-semibold">Need more detail?</h2>
            <p className="mt-3 text-sm leading-6 text-primary-foreground/60">
              The tracking timeline explains every verified logistics event.
            </p>
            <Button
              asChild
              className="mt-7 rounded-full bg-primary-foreground text-primary"
            >
              <Link href="/track-order">
                Open tracking <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}
    </SupportPage>
  );
}
