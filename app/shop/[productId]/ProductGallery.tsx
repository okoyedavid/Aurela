"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProductProps } from "@/types/products";
import { Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ product }: { product: ProductProps }) {
  const [active, setActive] = useState(0);
  const media: Array<{ type: "image" | "video"; src: string; id: string }> = product.images.map((src, index) => ({ type: "image", src, id: `image-${index}` }));
  if (product.video) media.splice(1, 0, { type: "video" as const, src: product.video, id: "video" });

  return (
    <div>
      <div className="-mx-3 flex snap-x snap-mandatory gap-2 overflow-x-auto px-3 pb-3 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0">
        {media.map((item, index) => (
          <div key={item.id} className={`relative aspect-[4/5] w-[88vw] max-w-[520px] shrink-0 snap-center overflow-hidden rounded-[1.5rem] bg-muted lg:w-auto lg:max-w-none ${index === 0 ? "lg:col-span-2" : ""}`}>
            {item.type === "video" ? <video src={item.src} poster={product.image} muted loop autoPlay playsInline controls className="h-full w-full object-cover" /> : <Image fill src={item.src} alt={`${product.name}, view ${index + 1}`} sizes="(max-width:1024px) 88vw, 55vw" className="object-cover" />}
            {item.type === "image" && <Dialog onOpenChange={open => open && setActive(index)}><DialogTrigger asChild><button type="button" aria-label={`Expand image ${index + 1}`} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-background/85 text-foreground backdrop-blur"><Expand className="h-4 w-4" /></button></DialogTrigger><DialogContent className="h-[92dvh] max-w-6xl border-0 bg-primary p-3 text-primary-foreground"><DialogTitle className="sr-only">{product.name} gallery</DialogTitle><DialogDescription className="sr-only">Expanded product image</DialogDescription><div className="relative h-full w-full"><Image fill src={media[active]?.src ?? item.src} alt={`${product.name}, expanded view`} sizes="100vw" className="object-contain" /></div></DialogContent></Dialog>}
          </div>
        ))}
      </div>
      <div className="mt-2 text-center text-xs text-muted-foreground lg:hidden">Swipe to explore · {media.length} views</div>
    </div>
  );
}
