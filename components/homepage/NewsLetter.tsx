"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Newsletter() {
  return (
    <section className="overflow-hidden px-3 py-12 sm:px-5 lg:overflow-visible lg:px-6 lg:py-24">
      <div className="relative mx-auto max-w-6xl rounded-[2rem] bg-primary text-primary-foreground lg:min-h-[430px] lg:rounded-[2.5rem]">
        <div className="relative z-10 max-w-2xl p-7 lg:p-8">
          <h2 className="mt-5 max-w-[12ch] text-4xl font-semibold leading-[0.95] tracking-[-0.055em] text-balance sm:text-5xl lg:text-6xl">
            Considered stories, delivered quietly.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-primary-foreground/65 sm:text-base">
            Receive new collections, independent shop stories and carefully
            selected pieces. No noise—only what deserves your attention.
          </p>
          <form className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              name="email"
              autoComplete="email"
              required
              aria-label="Email address"
              placeholder="Email address"
              className="h-12 min-w-0 flex-1 rounded-full border-primary-foreground/20 bg-primary-foreground/10 px-5 text-primary-foreground placeholder:text-primary-foreground/45 focus-visible:border-primary-foreground/50 focus-visible:ring-primary-foreground/20"
            />
            <Button
              type="submit"
              className="h-12 shrink-0 rounded-full bg-primary-foreground px-6 text-primary hover:bg-primary-foreground/90"
            >
              Subscribe <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
          <p className="mt-4 text-xs leading-5 text-primary-foreground/45">
            By subscribing, you agree to receive Aurela editorial updates. You
            can unsubscribe at any time.
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 hidden h-[125%] w-[48%] lg:block">
          <Image
            fill
            src="/ads/womansuit.png"
            alt="Woman wearing a tailored Aurela suit"
            sizes="45vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
