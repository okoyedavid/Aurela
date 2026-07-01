import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const frames = [
  { src: "/products/squattingmodel.jpeg", alt: "Model styling a neutral look" },
  { src: "/products/weddingredDress.jpeg", alt: "Red dress in motion" },
  { src: "/products/simpleman.jpeg", alt: "Menswear look" },
];

export default function ReelsTeaser() {
  return (
    <section className="px-3 py-8 sm:px-5 sm:py-14 lg:px-6">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-primary text-primary-foreground lg:grid-cols-[.85fr_1.15fr]">
        <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-primary-foreground/55">Discover in motion</p>
          <h2 className="mt-5 max-w-lg text-4xl leading-tight sm:text-5xl">See how a piece moves before it becomes yours.</h2>
          <p className="mt-5 max-w-md leading-7 text-primary-foreground/65">Short, shoppable stories reveal the drape, texture and styling details a still image can miss.</p>
          <Link href="/reels" className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:opacity-90">Explore Discover <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <Link href="/reels" aria-label="Open Discover in motion" className="group grid min-h-[28rem] grid-cols-3 gap-1 overflow-hidden bg-primary-foreground/10 p-1 sm:min-h-[36rem] sm:gap-2 sm:p-2">
          {frames.map((frame, index) => <div key={frame.src} className={`relative overflow-hidden rounded-[1.4rem] ${index === 1 ? "translate-y-6" : "-translate-y-6"}`}><Image src={frame.src} alt={frame.alt} fill sizes="(max-width: 1024px) 33vw, 20vw" className="object-cover transition duration-700 group-hover:scale-105" /><span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" /><span className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-black backdrop-blur"><Play className="h-4 w-4 fill-current" /></span></div>)}
        </Link>
      </div>
    </section>
  );
}
