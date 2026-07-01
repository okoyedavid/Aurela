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
      className="absolute inset-0 flex h-full w-full will-change-transform items-center justify-center bg-black md:bg-gradient-to-b md:from-white md:to-gray-50"
      aria-hidden={!isActive}
    >
      <div className="relative flex h-full w-full max-w-3xl flex-col items-stretch gap-6 md:h-[88vh] md:flex-row md:p-8">
        {/* Left: Media */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gray-100 md:relative md:flex-1 md:rounded-2xl md:shadow-md">
          {/* Using next/image gives automatic optimization; fallback to img if not using Next.js */}
          {product.video ? (
            <video src={product.video} poster={product.image} autoPlay={isActive} muted loop playsInline className="h-full w-full object-cover" />
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
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Right: Info / Actions */}
        <div className="relative z-10 mt-auto flex w-full flex-col gap-4 bg-gradient-to-t from-black via-black/70 to-transparent p-6 pt-28 text-white md:mt-0 md:w-96 md:bg-none md:p-0 md:text-[#171717]">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-white/65 md:text-gray-500">{product.brand}</p>
          </div>

          <div className="flex-1 overflow-auto">
            <p className="line-clamp-3 text-sm leading-relaxed text-white/75 md:line-clamp-none md:text-gray-700">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="text-xl font-bold">
                ${product.price.toFixed(2)}
              </div>
              {product.originalPrice ? (
                <div className="text-xs line-through text-gray-400">
                  ${product.originalPrice.toFixed(2)}
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onQuickBuy?.(product.id)}
                className="px-4 py-2 rounded-md bg-black text-white text-sm shadow hover:opacity-95"
              >
                Quick buy
              </button>
              <button
                className="px-3 py-2 rounded-md border text-sm"
                aria-label="More actions"
              >
                …
              </button>
            </div>
          </div>

          <div className="flex gap-2 text-xs text-gray-500 mt-2">
            <div>{product.reviewCount ?? 0} reviews</div>
            <div>•</div>
            <div>{product.rating ?? 0} ★</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
