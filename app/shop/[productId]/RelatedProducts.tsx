"use client";
import ProductCard from "@/components/products/ProductCard";
import { selectRelatedProducts } from "@/features/products/productsSlice";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = useSelector((state: RootState) =>
    selectRelatedProducts(state, id, {
      matchBy: "category",
      excludeCurrent: true,
      sortBy: "popularity",
      fallback: true,
    })
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="mb-8"><p className="text-xs uppercase tracking-[.24em] text-muted-foreground">Continue exploring</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.04em] sm:text-5xl">You may also like</h2></div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
        {relatedProducts.slice(0, 4).map((productId) => (
          <ProductCard key={productId.id} id={productId.id} />
        ))}
      </div>
    </motion.div>
  );
}
