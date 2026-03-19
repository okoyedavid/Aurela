import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto rounded-4xl relative bg-black text-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[500px]">
        {/* Left Content */}
        <div className="flex items-start flex-col justify-center px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            COMMUNITY-DRIVEN
            <br />
            CULTURE
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-md">
            More than just a brand, we&apos;re a movement—connecting creatives,
            and trendsetters who define the streets.
          </p>
          <Link
            href={"/shop"}
            className="rounded-full hover:bg-white/90 hover:text-black/90 bg-white text-black"
          >
            <div className="flex items-center gap-3 px-6 py-2">
              <span>Shop now</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[500px]">
          <div className="absolute inset-0 bg-linear-to-l from-black/50 via-black/65 to-black z-10"></div>
          <Image
            src={"/products/squattingmodel.jpeg"}
            alt="Model wearing hoodie"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
