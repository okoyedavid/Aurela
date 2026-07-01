import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Women",
    subtitle: "Modern silhouettes",
    image: "/products/women.jpeg",
    href: "/category/womens-clothing",
    className: "md:col-span-2 lg:row-span-2",
  },
  {
    title: "Men",
    subtitle: "Considered tailoring",
    image: "/products/men.jpeg",
    href: "/category/mens-clothing",
    className: "",
  },
  {
    title: "Footwear",
    subtitle: "A grounded statement",
    image: "/products/footwear.jpeg",
    href: "/category/shoes",
    className: "",
  },
];

export default function Categories() {
  return (
    <section className="bg-muted px-3 py-14 sm:px-5 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[.26em] text-muted-foreground">
            Find your perspective
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-5xl">
            Shop by world
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:auto-rows-[250px] lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className={`group relative min-h-[340px] overflow-hidden rounded-[1.75rem] bg-primary text-primary-foreground md:min-h-[400px] lg:min-h-0 ${category.className}`}
            >
              <Image
                fill
                src={category.image}
                alt={`${category.title} collection`}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[.22em] text-primary-foreground/60">
                    {category.subtitle}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold">
                    {category.title}
                  </h3>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary-foreground/30 bg-primary/15 backdrop-blur">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
