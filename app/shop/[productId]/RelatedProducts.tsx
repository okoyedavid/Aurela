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
      <h2 className="text-2xl font-bold mb-8">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((productId) => (
          <ProductCard key={productId.id} id={productId.id} />
        ))}
      </div>
    </motion.div>
  );
}
