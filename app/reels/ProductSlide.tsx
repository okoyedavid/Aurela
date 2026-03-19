// components/ProductSlide.tsx
import React from "react";
import { ProductProps } from "@/types/products";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  product: ProductProps;
  isActive: boolean;
  onQuickBuy?: (id: string) => void;
};

export default React.memo(function ProductSlide({
  product,
  isActive,
  onQuickBuy,
}: Props) {
  if (!product) return null;

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 30, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.995 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50"
      aria-hidden={!isActive}
    >
      <div className="max-w-3xl w-full h-[86vh] md:h-[88vh] relative flex flex-col md:flex-row items-stretch gap-6 p-6 md:p-8">
        {/* Left: Media */}
        <div className="flex-1 flex items-center justify-center rounded-2xl overflow-hidden bg-gray-100 shadow-md">
          {/* Using next/image gives automatic optimization; fallback to img if not using Next.js */}
          {product.image ? (
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
        <div className="w-full md:w-96 flex flex-col gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              {product.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
          </div>

          <div className="flex-1 overflow-auto">
            <p className="text-sm text-gray-700 leading-relaxed">
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
