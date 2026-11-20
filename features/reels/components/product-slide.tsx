// components/ProductSlide.tsx
import React from "react";
import { ProductProps } from "@/types/products";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  product: ProductProps;
  isActive: boolean;
  direction: number;
  onQuickBuy?: (id: string) => void;
};

export default React.memo(function ProductSlide({
  product,
  isActive,
  direction,
  onQuickBuy,
}: Props) {
  if (!product) return null;

  return (
    <motion.div
      key={product.id}
      custom={direction}
      variants={{
        enter: (travel: number) => ({ y: travel > 0 ? "100%" : "-100%" }),
        center: { y: 0 },
        exit: (travel: number) => ({ y: travel > 0 ? "-100%" : "100%" }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className="absolute inset-0 flex h-full w-full will-change-transform items-center justify-center bg-scrim md:bg-linear-to-b md:from-background md:to-background"
      aria-hidden={!isActive}
    >
      <div className="relative flex h-full w-full max-w-3xl flex-col items-stretch gap-6 md:h-[88vh] md:flex-row md:p-8">
        {/* Left: Media */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-muted md:relative md:flex-1 md:rounded-2xl md:shadow-md">
          {/* Using next/image gives automatic optimization; fallback to img if not using Next.js */}
          {product.video ? (
            <video
              src={product.video}
              poster={product.image}
              autoPlay={isActive}
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : product.image ? (
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={isActive} // prioritize current slide
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>

        {/* Right: Info / Actions */}
        <div className="relative z-10 mt-auto flex w-full flex-col gap-4 bg-linear-to-t from-scrim via-scrim/70 to-transparent p-6 pt-28 text-scrim-foreground md:mt-0 md:w-96 md:bg-none md:bg-card md:text-card-foreground md:rounded-2xl">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-scrim-foreground/65 md:text-muted-foreground">
              {product.brand}
            </p>
          </div>

          <div className="flex-1 overflow-auto">
            <p className="line-clamp-3 text-sm leading-relaxed text-scrim-foreground/75 md:line-clamp-none md:text-foreground/80">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="text-xl font-bold">
                ${product.price.toFixed(2)}
              </div>
              {product.originalPrice ? (
                <div className="text-xs text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onQuickBuy?.(product.id)}
                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow hover:opacity-95"
              >
                Quick buy
              </button>
              <button
                className="rounded-md border border-border px-3 py-2 text-sm"
                aria-label="More actions"
              >
                …
              </button>
            </div>
          </div>

          <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
            <div>{product.reviewCount ?? 0} reviews</div>
            <div>•</div>
            <div>{product.rating ?? 0} ★</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
