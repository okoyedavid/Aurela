import { selectHotDrops } from "@/features/products/products-slice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ProductCard from "../products/product-card";

export default function NewDrops() {
  const products = useSelector((state: RootState) => selectHotDrops(state, 8));

  return (
    <section className="mx-auto max-w-7xl px-3 py-14 sm:px-5 lg:px-6 lg:py-20">
      <div className="mb-8"><p className="text-xs uppercase tracking-[.26em] text-muted-foreground">Just arrived</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Latest drops</h2></div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-12">
        {products.map((product) => (
          <ProductCard id={product.id} key={product.id} />
        ))}
      </div>
    </section>
  );
}
