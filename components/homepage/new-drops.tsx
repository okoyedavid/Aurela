import { selectHotDrops } from "@/features/products/productsSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ProductCard from "../products/ProductCard";

export default function NewDrops() {
  const products = useSelector((state: RootState) => selectHotDrops(state, 8));

  return (
    <div className="py-12 max-w-7xl mx-auto px-6">
      <h1 className="font-extrabold mb-4 md:mb-8 text-xl sm:text-2xl md:text-4xl lg:text-5xl">
        Latest Drops
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 mb-12">
        {products.map((product) => (
          <ProductCard id={product.id} key={product.id} />
        ))}
      </div>
    </div>
  );
}
