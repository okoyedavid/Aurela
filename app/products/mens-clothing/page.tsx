import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import mensHero from "@/images/mens-clothing.jpeg";

const navItems = ["Home", "Shop", "Pages", "Blog", "Contact Us"];
const categories = ["Women", "Men", "Kids", "Sale", "Accessories"];

const newArrivalItems = [
  {
    name: "Active Polo Tee",
    price: "$120.00",
    tag: "Men",
    image: "/products/men.jpeg",
  },
  {
    name: "Stripe Court Sneakers",
    price: "$145.00",
    tag: "Shoes",
    image: "/categories/jordan.jpeg",
  },
  {
    name: "Classic Navy Pullover",
    price: "$165.00",
    tag: "Outerwear",
    image: "/products/formalwear.jpeg",
  },
  {
    name: "Summer Edge Tee",
    price: "$98.00",
    tag: "Essentials",
    image: "/products/simpleman.jpeg",
  },
  {
    name: "Minimal Cap",
    price: "$58.00",
    tag: "Accessories",
    image: "/categories/watch.jpeg",
  },
  {
    name: "Midnight Hoodie",
    price: "$135.00",
    tag: "Layering",
    image: "/products/tobi.jpeg",
  },
  {
    name: "Weekend Graphic Tee",
    price: "$84.00",
    tag: "Casual",
    image: "/products/model.jpeg",
  },
  {
    name: "Soft Crew Sweatshirt",
    price: "$112.00",
    tag: "New",
    image: "/products/winterlook.jpeg",
  },
];

const footerColumns = [
  {
    title: "Company",
    links: ["About", "Collection", "Careers", "Journal"],
  },
  {
    title: "Help",
    links: ["Customer Support", "Shipping", "Track & Delivery", "Returns"],
  },
  {
    title: "Info",
    links: ["Store Policy", "Payments", "Privacy", "FAQ"],
  },
  {
    title: "Resources",
    links: ["Free eBooks", "Membership", "Article Hub", "Fashion People"],
  },
];

export default function MensClothingPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#171717]">
      <section className="relative isolate overflow-hidden bg-[#5f91bd]">
        <Image
          src={mensHero}
          alt="Editorial fashion campaign for men's clothing"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,52,71,0.55)_0%,rgba(34,52,71,0.18)_45%,rgba(34,52,71,0.06)_100%)]" />

        <div className="relative mx-auto flex min-h-[540px] max-w-6xl flex-col px-4 py-5 sm:px-6 lg:min-h-[620px] lg:px-8">
          <header className="flex items-center justify-between text-white">
            <div className="hidden items-center gap-5 text-[11px] uppercase tracking-[0.2em] md:flex">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="transition hover:text-white/75"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <button
                type="button"
                className="rounded-full border border-white/30 px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
              >
                Menu
              </button>
            </div>

            <Link
              href="#"
              className="font-serif text-2xl tracking-[0.16em] text-white"
            >
              Mixtas
            </Link>

            <div className="flex items-center gap-3 text-white/90">
              <button
                type="button"
                className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
              >
                <Heart className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
              >
                <User className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="mt-4 hidden items-center justify-center gap-7 text-[11px] uppercase tracking-[0.18em] text-white/80 lg:flex">
            {categories.map((item) => (
              <button key={item} type="button" className="flex items-center gap-2">
                <span>{item}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
            ))}
          </div>

          <div className="flex flex-1 items-center">
            <div className="max-w-md pt-16 text-white sm:pt-20 lg:pt-8">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                Summer 2026
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                Jackets for the
                <br />
                Modern Man
              </h1>
              <Button className="mt-8 rounded-none bg-white px-8 py-6 text-sm font-semibold text-[#171717] hover:bg-[#f0ece4]">
                Discovery Now
              </Button>
            </div>
          </div>

          <button
            type="button"
            className="absolute left-6 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md lg:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="absolute right-6 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md lg:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1d]">
              New Arrivals
            </h2>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-[11px] uppercase tracking-[0.24em] text-[#88837b]">
              <span className="font-semibold text-[#171717]">Women</span>
              <span>Men</span>
              <span>Kids</span>
              <span>Bags</span>
              <span>Accessories</span>
            </div>
          </div>

          <div className="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivalItems.map((item) => (
              <article key={item.name} className="group">
                <div className="relative aspect-square overflow-hidden border border-[#efebe4] bg-[#f7f5f0]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d877f]">
                    {item.tag}
                  </p>
                  <h3 className="text-sm font-medium text-[#181818]">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[#171717]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index} className="text-[10px]">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-[#55504a]">{item.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-[1.25fr_1fr_1fr]">
            <article className="relative min-h-[380px] overflow-hidden bg-[#ece7de]">
              <Image
                src="/products/simpleman.jpeg"
                alt="White hoodie campaign"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.05)_0%,rgba(17,17,17,0.4)_100%)]" />
              <div className="absolute left-6 top-6 max-w-[220px] text-white">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/75">
                  Autumn 2026
                </p>
                <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em]">
                  Where Dreams
                  <br />
                  Meet Couture
                </h3>
              </div>
            </article>

            <div className="grid gap-4">
              <article className="relative min-h-[180px] overflow-hidden bg-[#f0ece5]">
                <Image
                  src="/products/women.jpeg"
                  alt="Elegant womenswear campaign"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(17,17,17,0.25)_100%)]" />
                <div className="absolute left-5 top-5 max-w-[190px] text-[#171717]">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#5c5751]">
                    Autumn 2026
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em]">
                    Enchanting Styles
                    <br />
                    for Every Woman
                  </h3>
                  <Button className="mt-4 rounded-none bg-white px-5 text-xs font-semibold text-[#171717] hover:bg-[#f2eee7]">
                    Shop Now
                  </Button>
                </div>
              </article>

              <article className="relative min-h-[180px] overflow-hidden bg-[#f3efe8]">
                <Image
                  src="/categories/shoes.jpeg"
                  alt="Minimal footwear campaign"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(17,17,17,0.08)_100%)]" />
                <div className="absolute left-5 top-5 max-w-[180px] text-[#171717]">
                  <h3 className="text-2xl font-semibold leading-tight tracking-[-0.04em]">
                    Chic Footwear for
                    <br />
                    City Living
                  </h3>
                  <Button className="mt-4 rounded-none bg-white px-5 text-xs font-semibold text-[#171717] hover:bg-[#f2eee7]">
                    Shop Now
                  </Button>
                </div>
              </article>
            </div>

            <article className="relative min-h-[380px] overflow-hidden bg-[#325f86]">
              <Image
                src="/products/winterlook.jpeg"
                alt="Blue outerwear fashion campaign"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,35,55,0.08)_0%,rgba(20,35,55,0.55)_100%)]" />
              <div className="absolute left-6 top-6 max-w-[210px] text-white">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/75">
                  Trending Bags for Her
                </p>
                <div className="mt-5 text-6xl font-semibold leading-none tracking-[-0.08em]">
                  50%
                </div>
                <p className="mt-1 text-lg uppercase tracking-[0.22em] text-white/85">
                  Off
                </p>
                <Button className="mt-5 rounded-none bg-white px-5 text-xs font-semibold text-[#171717] hover:bg-[#f2eee7]">
                  Shop Now
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#ece7de] bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] lg:px-8">
          <div className="space-y-4">
            <div className="font-serif text-3xl tracking-[0.16em] text-[#171717]">
              Mixtas
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#7b756d]">
              We fuse runway-led ideas with practical everyday pieces for the
              modern wardrobe.
            </p>
            <div className="flex items-center gap-3">
              {[Heart, Search, ShoppingBag].map((Icon, index) => (
                <span
                  key={index}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e8e2d8] text-[#3b3732]"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#171717]">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[#7b756d]">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="transition hover:text-[#171717]">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}
