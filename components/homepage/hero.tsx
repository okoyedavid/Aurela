import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6">
      <div className="relative mx-auto min-h-[calc(100svh-5.5rem)] max-w-7xl overflow-hidden rounded-[1.75rem] bg-scrim text-scrim-foreground sm:min-h-[680px] sm:rounded-[2.5rem] lg:h-[min(82vh,780px)] lg:min-h-[620px]">
        <Image
          src="/products/squattingmodel.jpeg"
          // src="/auth/men-3.jpg"
          alt="Aurela campaign model wearing the latest collection"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-[62%_top] sm:object-[20%_40%]"
        />

        <div className="absolute inset-0 bg-linear-to-b from-scrim/15 via-scrim/15 to-scrim/90 sm:bg-linear-to-r sm:from-scrim/80 sm:via-scrim/35 sm:to-scrim/10" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-scrim/75 to-transparent sm:hidden" />

        <div className="relative flex min-h-[calc(100svh-5.5rem)] flex-col p-6 sm:min-h-[680px] sm:p-10 lg:h-full lg:min-h-0 lg:p-14">
          <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.28em] text-scrim-foreground/70 sm:text-xs">
            <span>Editorial 01</span>
            <span>New collection · 2026</span>
          </div>

          <div className="mt-auto max-w-3xl pb-3 sm:pb-5">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-scrim-foreground/70">
              Aurela presents
            </p>
            <h1 className="mt-5 max-w-[12ch] text-5xl font-semibold leading-[0.9] tracking-[-0.065em] text-balance sm:text-7xl lg:text-[6.6rem]">
              The new language of personal style.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-scrim-foreground/75 sm:text-base sm:leading-8">
              Pieces chosen for presence and made to remain. Discover a
              collection where restraint, character and modern craft meet.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-scrim-foreground px-7 text-sm font-semibold text-scrim transition hover:bg-scrim-foreground/90"
              >
                Shop the collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/reels"
                className="inline-flex h-12 items-center justify-center rounded-full border border-scrim-foreground/35 bg-scrim/10 px-7 text-sm font-medium text-scrim-foreground backdrop-blur-sm transition hover:bg-scrim-foreground/10"
              >
                View the editorial
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-scrim-foreground/65 lg:flex">
            Scroll to explore
            <span className="grid h-10 w-10 place-items-center rounded-full border border-scrim-foreground/25">
              <ArrowDown className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
