import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import Image from "next/image";

const filterPills = ["Categories", "New Product"];
const quickLinks = ["Men", "Women", "Children", "Popular"];

export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-[#d9d9d9] px-3 py-4 text-[#111111] sm:px-5 sm:py-6">
      <div className="mx-auto max-w-6xl bg-white">
        <div className="px-4 py-5 sm:px-8 sm:py-7">
          <header className="flex items-center justify-between">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7d7d7] text-[#111111] transition hover:bg-[#f6f6f6]"
            >
              <Menu className="h-4 w-4" />
            </button>

            <div className="text-center text-2xl font-semibold uppercase tracking-[0.08em]">
              Hoodie
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7d7d7] text-[#111111] transition hover:bg-[#f6f6f6]"
              >
                <User className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7d7d7] text-[#111111] transition hover:bg-[#f6f6f6]"
              >
                <ShoppingBag className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="mt-5 flex flex-col gap-3 border-b border-[#e5e5e5] pb-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {filterPills.map((label) => (
                <button
                  key={label}
                  type="button"
                  className="inline-flex h-11 items-center justify-between gap-4 rounded-full border border-[#dcdcdc] px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111111]"
                >
                  <span>{label}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              ))}

              <button
                type="button"
                className="inline-flex h-11 min-w-[220px] items-center justify-between rounded-full border border-[#dcdcdc] px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111111]"
              >
                <span className="text-[#7a7a7a]">Search...</span>
                <Search className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickLinks.map((label) => (
                <button
                  key={label}
                  type="button"
                  className="inline-flex h-10 items-center rounded-full border border-[#dcdcdc] px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111111]"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <section className="relative pt-8 sm:pt-10">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#191919]">
                The Best Hoodies Are Only Here
              </p>
            </div>

            <div className="mt-3 text-center">
              {/* Changed: oversized hero word is the main editorial statement of the page. */}
              <h1 className="text-[4.4rem] font-black uppercase leading-none tracking-[-0.12em] text-[#111111] sm:text-[7.25rem] md:text-[9rem] lg:text-[10rem]">
                Hoodie
              </h1>
            </div>

            <div className="relative mx-auto mt-5 max-w-5xl bg-[#efe7df]">
              <div className="relative aspect-[1.08/1]">
                <Image
                  src="/products/simpleman.jpeg"
                  alt="Cream hoodie campaign"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute bottom-4 left-4 w-[170px] bg-white p-4 shadow-[0_14px_40px_rgba(0,0,0,0.08)] sm:bottom-8 sm:left-8 sm:w-[240px] sm:p-6">
                {/* Changed: floating CTA card overlays the campaign image like a printed editorial label. */}
                <div className="text-lg font-semibold uppercase tracking-[0.12em]">
                  Swipe
                </div>
                <div className="mt-4 h-px w-full bg-[#111111]" />
                <div className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#575757]">
                  Discover Now
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
