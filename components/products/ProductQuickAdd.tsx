"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addItem } from "@/features/Cart/cartSlice";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductProps } from "@/types/products";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import ProductVariantPicker, {
  buildCartLineId,
  getRequiredVariantTypes,
  SelectedProductVariants,
} from "./ProductVariantPicker";

interface ProductQuickAddProps {
  product: ProductProps;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductQuickAdd({
  product,
  open,
  onOpenChange,
}: ProductQuickAddProps) {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [selectedVariants, setSelectedVariants] =
    useState<SelectedProductVariants>({});

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      // Changed: reset quick-add selections each time the overlay closes.
      setSelectedVariants({});
    }

    onOpenChange(nextOpen);
  };

  const handleAddToCart = () => {
    const requiredVariants = getRequiredVariantTypes(product.variants);
    const missingVariants = requiredVariants.filter(
      (type) => !selectedVariants[type],
    );

    if (missingVariants.length > 0) {
      toast.warning("Please select all options", {
        description: `Please select: ${missingVariants.join(", ")}`,
      });
      return;
    }

    // Changed: quick add now passes the selected options through the cart payload.
    dispatch(
      addItem({
        id: buildCartLineId(product.id, selectedVariants),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        variant: selectedVariants,
        maxQuantity: Math.max(product.stockCount, 1),
      }),
    );

    toast.success("Added to cart", {
      description: `${product.name} added to your cart.`,
    });
    handleOpenChange(false);
  };

  const content = (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="relative h-24 w-20 overflow-hidden rounded-xl bg-muted">
          <Image
            fill
            src={product.image}
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">
            Select your preferred options before adding this item.
          </p>
          <div className="text-base font-semibold">${product.price}</div>
        </div>
      </div>

      <ProductVariantPicker
        variants={product.variants}
        selectedVariants={selectedVariants}
        onVariantChange={setSelectedVariants}
      />

      <Button className="w-full" onClick={handleAddToCart}>
        Add To Cart
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side="bottom" className="max-h-[85vh] rounded-t-3xl">
          <SheetHeader className="px-0">
            <SheetTitle>Select Options</SheetTitle>
            <SheetDescription>
              Choose your variant before adding this item.
            </SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto px-4 pb-6">{content}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Select Options</DialogTitle>
          <DialogDescription>
            Choose your variant before adding this item.
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
