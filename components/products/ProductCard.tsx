"use client";

import { addItem, isInCart } from "@/features/Cart/cartSlice";
import { selectProductById } from "@/features/products/productsSlice";
import { RootState } from "@/store/store";
import { Check, Heart, ShoppingBag, Star } from "lucide-react";
import { selectIsWishlisted, wishlistToggled } from "@/features/Wishlist/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import ProductQuickAdd from "./ProductQuickAdd";

export default function ProductCard({ id }: { id: string }) {
  const product = useSelector((state: RootState) => selectProductById(state, id));
  const inCart = useSelector((state: RootState) => isInCart(state, id));
  const wishlisted = useSelector((state: RootState) => selectIsWishlisted(state, id));
  const dispatch = useDispatch();
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  const addToCart = () => {
    if (product.variants.length) return setQuickAddOpen(true);
    dispatch(addItem({ id: product.id, productId: product.id, name: product.name, price: product.price, image: product.image, maxQuantity: product.stockCount, quantity: 1 }));
  };

  return (
    <article className="group min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-muted">
        <Link href={`/products/${product.id}`} className="absolute inset-0">
          <Image fill src={product.image} alt={product.name} sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 24vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
        </Link>
        {(product.onSale || product.badge) && <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.15em] text-foreground backdrop-blur">{product.onSale ? `${Math.round((1 - product.price / product.originalPrice!) * 100)}% off` : product.badge}</span>}
        <button type="button" onClick={() => dispatch(wishlistToggled(product.id))} aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name}`} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-background/85 text-foreground backdrop-blur transition hover:bg-background"><Heart className={`h-4 w-4 ${wishlisted ? "fill-current text-destructive" : ""}`} /></button>
        <Button type="button" size="icon" onClick={addToCart} disabled={!product.inStock || inCart} aria-label={inCart ? `${product.name} is in your cart` : `Add ${product.name} to cart`} className="absolute bottom-3 right-3 rounded-full bg-background text-foreground shadow-lg hover:bg-background/90">
          {inCart ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
        </Button>
      </div>
      <div className="px-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0"><p className="text-[10px] font-medium uppercase tracking-[.18em] text-muted-foreground">{product.brand}</p><Link href={`/products/${product.id}`} className="mt-1 block truncate font-medium text-foreground hover:underline">{product.name}</Link></div>
          <div className="shrink-0 text-right"><div className="font-semibold">${product.price.toFixed(2)}</div>{product.originalPrice && <div className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</div>}</div>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3.5 w-3.5 fill-current" /><span>{product.rating.toFixed(1)}</span><span>·</span><span>{product.reviewCount} reviews</span></div>
      </div>
      <ProductQuickAdd product={product} open={quickAddOpen} onOpenChange={setQuickAddOpen} />
    </article>
  );
}
