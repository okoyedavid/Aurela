import PublicPageShell from "@/components/PublicPageShell";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const principles = [
  [
    "Considered discovery",
    "A quieter way to find pieces across independent sellers—edited around relevance, not endless noise.",
  ],
  [
    "Visible standards",
    "Clear product details, seller expectations and marketplace policies make confidence part of the experience.",
  ],
  [
    "Style with a longer life",
    "We favour useful context: fit, movement, materials and care, so choices can remain in rotation.",
  ],
];

export default function AboutPage() {
  return (
    <PublicPageShell>
      <section className="px-3 pb-10 pt-5 sm:px-5 lg:px-6">
        <div className="relative mx-auto min-h-[72svh] max-w-7xl overflow-hidden rounded-4xl bg-primary text-primary-foreground ring-1 ring-white/0 dark:ring-white/10">
          <Image
            src="/auth/women-2.jpg"
            alt="Aurela editorial portrait"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-70 dark:opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent dark:from-black/85 dark:via-black/55 dark:to-black/10" />

          <div className="relative flex min-h-[72svh] max-w-3xl flex-col justify-end p-7 sm:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[.3em] text-white/65">
              The Aurela story
            </p>
            <h1 className="mt-5 text-4xl leading-[.98] text-white sm:text-6xl lg:text-7xl">
              Many perspectives.
              <br />
              One considered place.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Aurela is a fashion marketplace built to make independent
              discovery feel coherent, credible and deeply personal.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-3 lg:gap-24 lg:px-6 lg:py-28">
        <div className="col-span-2 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-muted-foreground">
            Why we exist
          </p>
          <h2 className="text-4xl leading-tight sm:text-5xl">
            Choice should feel expansive, not exhausting.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Fashion marketplaces create access, but access without context
              becomes noise. Aurela brings products from many sellers into one
              calm, consistent experience—without flattening the character that
              made them worth finding.
            </p>
            <p>
              We are building the layer between inspiration and confidence:
              richer product stories, clearer standards, and tools that help
              customers understand how something looks, moves and belongs in
              their lives.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/60 px-5 py-20 lg:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-muted-foreground">
              Our principles
            </p>
            <h2 className="mt-4 text-4xl sm:text-5xl">
              Luxury is clarity, care and restraint.
            </h2>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-4xl border border-border bg-border md:grid-cols-3">
            {principles.map(([title, copy], index) => (
              <article key={title} className="bg-card p-8 sm:p-10">
                <span className="text-sm text-muted-foreground">
                  0{index + 1}
                </span>
                <h3 className="mt-16 text-2xl">{title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-6 lg:py-28">
        <div className="relative min-h-128 overflow-hidden rounded-4xl">
          <Image
            src="/products/cultural.jpeg"
            alt="A distinctive fashion perspective"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-top-left"
          />
        </div>
        <div className="flex flex-col justify-center lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-muted-foreground">
            A marketplace, with a point of view
          </p>
          <h2 className="mt-5 text-4xl sm:text-5xl">
            Independent does not have to mean disconnected.
          </h2>
          <p className="mt-6 leading-8 text-muted-foreground">
            Sellers keep their perspective. Customers gain one dependable place
            to discover, purchase and follow an order. Aurela provides the
            shared language around presentation, trust and service.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/editorial"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Read our stories <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sustainability"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold"
            >
              Our standards
            </Link>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
