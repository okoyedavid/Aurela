"use client";
import {
  addItem,
  isInCart,
} from "@/features/Cart/cartSlice";
import { selectProductById } from "@/features/products/productsSlice";
import { RootState } from "@/store/store";
import { Check, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import ProductQuickAdd from "./ProductQuickAdd";

export default function ProductCard({ id }: { id: string }) {
  const product = useSelector((state: RootState) =>
    selectProductById(state, id),
  );
  const inCart = useSelector((state: RootState) => isInCart(state, id));
  const dispatch = useDispatch();
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (product.variants.length > 0) {
      // Changed: listing cards now collect options before adding configurable products.
      setQuickAddOpen(true);
      return;
    }

    dispatch(
      addItem({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        maxQuantity: 5,
        quantity: 1,
      }),
    );
  };

  const router = useRouter();
  const handleClick = () => router.push(`/shop/${product.id}`);

  return (
    <div className="relative w-full bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-400 ease-in-out hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] font-[Segoe_UI,Tahoma,Geneva,Verdana,sans-serif] mx-auto">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 right-4 bg-linear-to-r from-zinc-900 to-zinc-800 text-white text-[12px] font-semibold tracking-wider uppercase px-3 py-1 rounded-xl shadow-md z-10">
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div className="overflow-hidden transform-3d perspective-[1000px]">
        <div onClick={handleClick} className="h-60 overflow-hidden relative">
          <Image
            fill
            src={product.image}
            alt="Premium Watch"
            className="w-full h-full object-cover object-top-left transition-transform duration-800ms ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-105"
          />
        </div>
      </div>

      {/* Info */}
      <div className="p-6 relative">
        <div className="text-[12px] font-semibold tracking-wider uppercase text-zinc-500 mb-2">
          Luxury Timepiece
        </div>
        <h2 className="text-[20px] font-bold text-zinc-900 mb-3 leading-tight">
          {product.name}
        </h2>

        <p className="text-[14px] text-zinc-600 leading-relaxed mb-4">
          {product.description.substring(0, 50)}...
        </p>

        {/* Price + Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-sm line-through text-zinc-400">
              ${product.originalPrice}
            </span>
            <span className="text-[22px] font-bold text-zinc-900">
              ${product.price}
            </span>
          </div>

          {inCart ? (
            <Button
              type="button"
              variant="secondary"
              disabled
              className="min-w-32 bg-zinc-100 text-zinc-500"
            >
              <Check className="mr-2 h-4 w-4" />
              Added
            </Button>
          ) : (
            <Button
              type="button"
              onClick={addToCart}
              className="relative min-w-32 bg-linear-to-r from-zinc-900 to-zinc-800 text-[14px] font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-[3px] hover:from-zinc-800 hover:to-zinc-700 hover:shadow-lg"
            >
              <span className="relative z-10">
                {product.variants.length > 0 ? "Select Options" : "Add to Cart"}
              </span>
              <ShoppingCart />
            </Button>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex justify-between items-center border-t border-zinc-100 pt-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#FFD700"
                stroke="#FFD700"
                strokeWidth="0.5"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            ))}
            <span className="ml-2 text-[12px] text-zinc-500">128 Reviews</span>
          </div>

          <div className="text-[12px] font-semibold text-green-500">
            In Stock
          </div>
        </div>
      </div>
      <ProductQuickAdd
        product={product}
        open={quickAddOpen}
        onOpenChange={setQuickAddOpen}
      />
    </div>
  );
}
