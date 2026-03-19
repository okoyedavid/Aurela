import { selectHotDrops } from "@/features/products/productsSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard";

export default function Recommendations() {
  const products = useSelector(selectHotDrops);

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-extrabold mb-4 md:mb-8 text-xl sm:text-2xl md:text-4xl lg:text-5xl">
          Explore our Top picks
        </h2>
        <div className="flex space-x-2">
          <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.slice(0, 6).map((product, index) => (
          <ProductCard length={6} index={index} key={index} product={product} />
        ))}
      </div>
    </section>
  );
}
