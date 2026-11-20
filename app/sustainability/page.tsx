import PublicPageShell from "@/components/layout/public-page-shell";
import {
  ArrowUpRight,
  Check,
  FileCheck2,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const standards = [
  {
    Icon: FileCheck2,
    title: "Specific claims",
    copy: "Sellers must name the material, process or certification behind a claim. Broad labels such as ‘green’ or ‘planet friendly’ are not enough on their own.",
  },
  {
    Icon: ShieldCheck,
    title: "Evidence before badges",
    copy: "Composition, origin and certification claims should be supported by current documentation. A badge should summarise evidence, never replace it.",
  },
  {
    Icon: PackageCheck,
    title: "Clear responsibility",
    copy: "Every listing should distinguish what applies to the product, its packaging and its delivery. Improvement in one area cannot stand in for the whole lifecycle.",
  },
];

const sellerRequirements = [
  "Declare fibre composition and known blends accurately",
  "Identify the basis and scope of environmental claims",
  "Keep certification and supplier evidence available for review",
  "Provide useful care guidance and avoid exaggerated durability claims",
  "Update a listing when materials, suppliers or processes change",
];

export default function SustainabilityPage() {
  return (
    <PublicPageShell>
      <section className="px-3 pb-12 pt-5 sm:px-5 lg:px-6">
        <div className="relative mx-auto min-h-[70svh] max-w-7xl overflow-hidden rounded-4xl bg-primary">
          <Image
            src="/products/winterlook.jpeg"
            alt="A considered layered look"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-65 dark:opacity-85"
          />
          <div className="absolute inset-0 bg-linear-to-r from-scrim/85 via-scrim/50 to-scrim/5" />
          <div className="relative flex min-h-[70svh] max-w-3xl flex-col justify-end p-7 text-white sm:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[.3em] text-white/60">
              Marketplace standards
            </p>
            <h1 className="mt-5 text-5xl leading-none sm:text-7xl">
              Less vague.
              <br />
              More accountable.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
              Our approach to sustainability begins with information customers
              can inspect and standards sellers can follow—not claims we cannot
              prove.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[.7fr_1.3fr] lg:gap-24 lg:px-6 lg:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-muted-foreground">
            Our position
          </p>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            Last reviewed July 2026
          </p>
        </div>
        <div>
          <h2 className="text-4xl leading-tight sm:text-5xl">
            There is no single sustainable product.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Materials, production, transport, use and end-of-life all carry
              different impacts. A marketplace cannot responsibly collapse those
              trade-offs into one unqualified label.
            </p>
            <p>
              Aurela’s role is to require clearer disclosure, challenge
              unsupported claims, and make credible evidence easier to
              understand. These standards describe the framework we are
              building; publication here does not mean every current listing has
              already completed verification.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/60 px-5 py-20 lg:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-muted-foreground">
            How claims should work
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-4xl border border-border bg-border lg:grid-cols-3">
            {standards.map(({ Icon, title, copy }) => (
              <article key={title} className="bg-card p-8 sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-muted">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-14 text-2xl">{title}</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-20 lg:px-6 lg:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-muted-foreground">
            Seller disclosure
          </p>
          <h2 className="mt-5 text-4xl sm:text-5xl">
            What sellers are expected to provide.
          </h2>
          <p className="mt-6 leading-8 text-muted-foreground">
            Requirements will be enforced through listing fields, evidence
            review and marketplace moderation as those systems are introduced.
          </p>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {sellerRequirements.map((requirement) => (
            <li key={requirement} className="flex gap-4 py-6 leading-7">
              <Check className="mt-1 h-5 w-5 shrink-0" />
              {requirement}
            </li>
          ))}
        </ul>
      </section>

      <section className="px-3 py-6 sm:px-5 lg:px-6">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-4xl bg-primary dark:bg-muted text-scrim-foreground lg:grid-cols-2">
          <div className="p-7 sm:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-scrim-foreground/55">
              Materials & restrictions
            </p>
            <h2 className="mt-5 text-4xl sm:text-5xl">
              Evidence determines what customers see.
            </h2>
            <p className="mt-6 leading-8 text-scrim-foreground/65">
              A future product-level framework will separate verified
              certification, seller-documented attributes and unverified
              descriptions. Restricted and prohibited materials or processes
              will follow applicable law and Aurela’s listing policy.
            </p>
            <Link
              href="/prohibited-items"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground"
            >
              View listing restrictions <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="border-t border-scrim-foreground/15 p-7 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-scrim-foreground/55">
              Packaging & delivery
            </p>
            <h2 className="mt-5 text-4xl sm:text-5xl">
              Measure before promising.
            </h2>
            <p className="mt-6 leading-8 text-scrim-foreground/65">
              We intend to collect packaging type, shipment origin and
              fulfilment method separately. Until measurement is reliable,
              Aurela will not present a platform-wide carbon-neutral or
              low-impact delivery claim.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-6 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-muted-foreground">
            Accountability roadmap
          </p>
          <h2 className="mt-5 text-4xl sm:text-5xl">
            What comes next must be measurable.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-3">
          {[
            [
              "01",
              "Structured listing data",
              "Material composition, claim scope, evidence status and care become distinct product fields.",
            ],
            [
              "02",
              "Review & enforcement",
              "Document checks, expiry dates, reporting tools and consequences for repeated misleading claims.",
            ],
            [
              "03",
              "Marketplace reporting",
              "Publish coverage, rejected claims and packaging data only after the underlying information is dependable.",
            ],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span className="text-sm text-muted-foreground">{number}</span>
              <h3 className="mt-7 text-2xl">{title}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 rounded-4xl border border-border bg-card p-7 sm:p-10">
          <h3 className="text-2xl">A standard should be open to challenge.</h3>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            If a product claim appears unclear or unsupported, contact customer
            care with the listing URL and the claim in question. Reports should
            trigger review; they do not automatically prove wrongdoing.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
          >
            Contact customer care <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicPageShell>
  );
}
