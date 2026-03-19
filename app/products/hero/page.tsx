import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = ["Shop", "Collections", "Catalog"];
const collectionTabs = ["All", "Popular", "New"];

const collectionItems = [
  {
    name: "YSL Crossbody",
    price: "$129.99",
    image: "/categories/handBag.jpeg",
  },
  {
    name: "Sunshine Sliders",
    price: "$899.00",
    image: "/categories/heels.jpeg",
  },
  {
    name: "Barrel Bag",
    price: "$1,569.05",
    image: "/categories/briefcase.jpeg",
  },
];

export default function ProductsHeroPage() {
  return (
    <main className="min-h-screen bg-[#efefef] px-3 py-4 text-[#171717] sm:px-5 sm:py-6">
      <div className="mx-auto max-w-5xl bg-white px-4 py-4 shadow-[0_12px_45px_rgba(18,18,18,0.06)] sm:px-6 sm:py-5">
        <section className="relative overflow-hidden">
          <div className="relative min-h-[420px] sm:min-h-[520px]">
            {/* <Image
              src={""}
              alt="Luxury fashion collection editorial hero"
              fill
              priority
              className="object-cover"
            /> */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.10)_0%,rgba(17,17,17,0.20)_42%,rgba(17,17,17,0.58)_100%)]" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-4 text-white sm:px-6">
              <nav className="hidden items-center gap-5 text-xs font-medium md:flex">
                {navItems.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="transition hover:text-white/75"
                  >
                    {item}
                  </Link>
                ))}
              </nav>

              <div className="text-xl font-semibold tracking-[0.06em] text-white md:absolute md:left-1/2 md:-translate-x-1/2">
                Luxe
              </div>

              <div className="ml-auto flex items-center gap-3">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#171717] transition hover:bg-white"
                >
                  <ShoppingBag className="h-4 w-4" />
                </button>
                <Button className="rounded-none border border-white/50 bg-transparent px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-white hover:text-[#171717]">
                  Shop The Look
                </Button>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 px-4 pb-10 text-center text-white sm:px-8 sm:pb-14">
              {/* Changed: centered serif headline and compact CTA mirror the reference hero composition. */}
              <h1 className="font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-6xl">
                Fashion That Speaks to You!
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/85 sm:text-base">
                Shop our curated collections designed for every occasion.
              </p>
              <Button className="mt-6 rounded-none bg-white px-8 py-6 text-sm font-semibold text-[#171717] hover:bg-[#f4f1ea]">
                Shop Now
              </Button>
            </div>
          </div>
        </section>

        <section className="px-1 py-12 sm:px-4 sm:py-14">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a857d]">
              Collections
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] text-[#1d1d1d] sm:text-5xl">
              Our Collection
            </h2>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-0 border border-[#dcd6cd] text-xs font-semibold uppercase tracking-[0.2em] text-[#65605a] sm:inline-flex">
              {collectionTabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  className={`min-w-[120px] border-r border-[#dcd6cd] px-6 py-4 last:border-r-0 ${
                    index === 1 ? "bg-[#222222] text-white" : "bg-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {collectionItems.map((item) => (
              <article key={item.name} className="space-y-4">
                <div className="relative aspect-[0.92/1] overflow-hidden bg-[#f2f2f2]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button className="w-full rounded-none bg-[#222222] py-6 text-sm font-semibold text-white hover:bg-black">
                  Add to Cart
                </Button>
                <div className="flex items-start justify-between gap-4 text-sm sm:text-base">
                  <h3 className="font-semibold text-[#1d1d1d]">{item.name}</h3>
                  <p className="font-semibold text-[#1d1d1d]">{item.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
