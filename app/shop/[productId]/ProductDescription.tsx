"use client";

import ProductVariantPicker, { buildCartLineId, getRequiredVariantTypes } from "@/components/products/ProductVariantPicker";
import { Button } from "@/components/ui/button";
import { addItem, selectCartItemById } from "@/features/Cart/cartSlice";
import { selectIsWishlisted, wishlistToggled } from "@/features/Wishlist/wishlistSlice";
import { RootState } from "@/store/store";
import { ProductPage } from "@/types/products";
import { Heart, Share2, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function ProductDescription({ product }: ProductPage) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [showSelectionError, setShowSelectionError] = useState(false);
  const dispatch = useDispatch();
  const isWishlisted = useSelector((state: RootState) => selectIsWishlisted(state, product.id));
  const required = getRequiredVariantTypes(product.variants);
  const missing = required.filter(type => !selectedVariants[type]);
  const lineId = missing.length ? null : buildCartLineId(product.id, selectedVariants);
  const cartLine = useSelector((state: RootState) => lineId ? selectCartItemById(state, lineId) : undefined);

  const addToBag = () => {
    if (missing.length) {
      setShowSelectionError(true);
      return;
    }
    dispatch(addItem({ id: lineId!, productId: product.id, name: product.name, price: product.price, image: product.image, maxQuantity: product.stockCount, quantity: 1, variant: selectedVariants }));
    toast.success("Added to bag", { description: product.name });
  };

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: product.name, text: product.description, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); toast.success("Link copied"); }
    } catch { /* A cancelled share sheet needs no error message. */ }
  };

  return (
    <section className="pb-20 lg:pb-0">
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[.22em] text-muted-foreground">{product.brand}</p><h1 className="mt-3 text-4xl font-semibold leading-[.95] tracking-[-.055em] sm:text-5xl">{product.name}</h1></div><div className="flex gap-1"><Button variant="ghost" size="icon" className="rounded-full" onClick={() => dispatch(wishlistToggled(product.id))} aria-label="Save product"><Heart className={isWishlisted ? "fill-current text-destructive" : ""} /></Button><Button variant="ghost" size="icon" className="rounded-full" onClick={share} aria-label="Share product"><Share2 /></Button></div></div>
      <button type="button" className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><Star className="h-4 w-4 fill-current" /> <span>{product.rating.toFixed(1)}</span><span>·</span><span className="underline underline-offset-4">{product.reviewCount} reviews</span></button>
      <div className="mt-7 flex items-end gap-3"><span className="text-3xl font-semibold">${product.price.toFixed(2)}</span>{product.originalPrice && <span className="pb-1 text-base text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>}</div>
      <p className="mt-6 text-sm leading-7 text-muted-foreground">{product.description}</p>
      <div className="mt-6 flex items-center gap-2 text-sm"><span className={`h-2 w-2 rounded-full ${product.inStock ? "bg-green-600" : "bg-destructive"}`} />{product.inStock ? `${product.stockCount} pieces available` : "Currently unavailable"}</div>

      {product.variants.length > 0 && <div className="mt-8 border-t border-border pt-7"><ProductVariantPicker variants={product.variants} selectedVariants={selectedVariants} onVariantChange={values => { setSelectedVariants(values); setShowSelectionError(false); }} /></div>}
      {showSelectionError && missing.length > 0 && <p role="alert" className="mt-4 text-sm text-destructive">Choose {missing.join(" and ")} before adding this piece.</p>}

      <Button size="lg" onClick={addToBag} disabled={!product.inStock || !!cartLine} className="mt-8 hidden h-13 w-full rounded-full lg:flex">{cartLine ? "In your bag" : <><ShoppingBag className="mr-2 h-5 w-5" /> Add to bag</>}</Button>

      <div className="mt-8 divide-y divide-border border-y border-border text-sm"><Disclosure title="Delivery & returns">Complimentary delivery over $50 and returns within 30 days.</Disclosure><Disclosure title="Seller">Sold by {product.brand}. Seller profiles will link to their public Aurela shop.</Disclosure></div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden"><div className="mx-auto flex max-w-lg items-center gap-3"><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{product.name}</p><p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p></div><Button onClick={addToBag} disabled={!product.inStock || !!cartLine} className="h-12 rounded-full px-6">{cartLine ? "In bag" : "Add to bag"}</Button></div></div>
    </section>
  );
}

function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return <details className="group py-4"><summary className="cursor-pointer list-none font-medium">{title}<span className="float-right text-muted-foreground group-open:rotate-45">+</span></summary><p className="pt-3 leading-6 text-muted-foreground">{children}</p></details>;
}
