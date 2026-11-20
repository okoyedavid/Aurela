import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SalesBanner() {
  return (
    <section className="bg-muted px-3 py-12 sm:px-5 lg:px-6 lg:py-16">
      <div className="relative mx-auto min-h-[520px] max-w-6xl overflow-hidden rounded-4xl bg-scrim text-scrim-foreground sm:min-h-[580px] lg:min-h-[500px] lg:rounded-[2.5rem]">
        <Image
          fill
          src="/products/weddingredDress.jpeg"
          alt="Aurela seasonal collection"
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-t from-scrim via-scrim/50 to-scrim/5 lg:bg-linear-to-r lg:from-scrim/90 lg:via-scrim/45 lg:to-scrim/10" />
        <div className="relative flex min-h-[520px] max-w-xl flex-col justify-end p-7 sm:min-h-[580px] sm:p-10 lg:min-h-[500px] lg:justify-center lg:p-14">
          <p className="text-xs uppercase tracking-[.28em] text-scrim-foreground/65">
            Seasonal edit · limited time
          </p>
          <h2 className="mt-5 text-5xl font-semibold leading-[.92] tracking-[-.055em] sm:text-6xl">
            The occasion collection.
          </h2>
          <p className="mt-5 max-w-md leading-7 text-scrim-foreground/70">
            Selected tailoring and evening pieces, considered for arrivals worth
            remembering.
          </p>
          <Link
            href="/collections/occasion-edit"
            className="mt-8 inline-flex h-12 w-fit items-center gap-3 rounded-full bg-scrim-foreground px-7 text-sm font-semibold text-scrim"
          >
            Explore the edit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
