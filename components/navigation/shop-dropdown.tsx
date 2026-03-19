import Link from "next/link";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const ShopDropDownLinks = [
  {
    index: "women",
    link: "/category/womens-clothing",
    title: " Women's Fashion",
    description: "Stylish clothing for women",
  },
  {
    index: "kids",
    link: "/category/mens-clothing",
    title: " Men's Fashion",
    description: "Stylish clothing for men",
  },
  {
    index: "child",
    link: "/category/kids-clothing",
    title: " kid's Fashion",
    description: "Stylish clothing for children",
  },
];

const categoriesDropDownLinks = [
  {
    index: "footwear",
    link: "/category/shoes",
    title: "Footwear",
    description: "Trendy shoes, heels, and sneakers",
  },
  {
    index: "accessories",
    link: "/category/accessories",
    title: "Accessories",
    description: "Bags, jewelry, and fashion essentials",
  },
  {
    index: "bags",
    link: "/category/bags",
    title: "Formal Wear",
    description: "Elegant suits, dresses, and business attire",
  },
];

const shopImages = [
  "/products/women.jpeg",
  "/products/men.jpeg",
  "/products/kids.jpeg",
];

const categoriesImages = [
  "/products/footwear.jpeg",
  "/products/accessories.jpeg",
  "/products/formalwear.jpeg",
];

export default function ShopDropDown({ type }: { type: string }) {
  const [currentHover, setCurrentHover] = useState(0);
  const [fade, setFade] = useState(false);

  const handleHover = (index: number) => {
    setFade(true);
    setTimeout(() => {
      setCurrentHover(index);
      setFade(false);
    }, 150);
  };

  const dropdownLinks =
    type === "Shop" ? ShopDropDownLinks : categoriesDropDownLinks;
  const images = type === "Shop" ? shopImages : categoriesImages;

  return (
    <div className="grid gap-3 p-1.5 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
      <div className="row-span-3">
        <NavigationMenuLink asChild>
          <Link
            className="flex relative rounded-xl overflow-hidden h-full w-full select-none flex-col justify-end  bg-linear-to-b from-muted/50 to-muted p-2.5 no-underline outline-none focus:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
            href="/products"
          >
            <Image
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={images[currentHover]}
              aria-hidden="true"
              className={`object-cover object-top-left transition-all duration-900 ease-in-out ${
                fade ? "animate-[fade-out_0.15s_ease-in-out_forwards]" : ""
              }`}
              alt=""
            />
            <div className="bg-linear-to-t from-black to-transparent inset-0 absolute z-1"></div>
            <div className="relative z-2 text-lg font-medium">
              <h3 className="text-white text-sm mb-2 mt-4">
                Featured Collection
              </h3>
              <p className="text-xs leading-tight text-muted-foreground">
                Discover our handpicked selection of premium items
              </p>
            </div>
          </Link>
        </NavigationMenuLink>
      </div>
      <div className="grid gap-3">
        {dropdownLinks.map((item, index) => (
          <NavigationMenuLink
            key={item.index}
            asChild
            onMouseEnter={() => handleHover(index)}
            onFocus={() => handleHover(index)}
            tabIndex={0}
          >
            <Link
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              )}
              href={item.link}
            >
              <div className="text-sm font-medium leading-none">
                {item.title}
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {item.description}
              </p>
            </Link>
          </NavigationMenuLink>
        ))}
      </div>
    </div>
  );
}
