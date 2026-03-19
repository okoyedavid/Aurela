"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Heart,
  RefreshCw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { ProductPage } from "@/types/products";
import { useState } from "react";
import { getBadgeVariant } from "@/lib/utils";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decreaseItemCount,
  increaseItemCount,
  selectCartItemById,
} from "@/features/Cart/cartSlice";
import { RootState } from "@/store/store";
import {
  buildCartLineId,
  getRequiredVariantTypes,
} from "@/components/products/ProductVariantPicker";
import ProductVariantPicker from "@/components/products/ProductVariantPicker";
export default function ProductDescription({ product }: ProductPage) {
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [isWishlisted, setIsWishlisted] = useState(false);
  const requiredVariants = getRequiredVariantTypes(product.variants);
  const hasVariantSelection =
    requiredVariants.length === 0 ||
    requiredVariants.every((type) => selectedVariants[type]);
  // Changed: PDP quantity controls now target the exact cart line for the selected variant.
  const selectedCartLineId = hasVariantSelection
    ? buildCartLineId(product.id, selectedVariants)
    : null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const cartValues = useSelector((state: RootState) =>
    selectedCartLineId ? selectCartItemById(state, selectedCartLineId) : null,
  );
  const dispatch = useDispatch();

  const decrement = () => {
    if (!selectedCartLineId) return;

    dispatch(
      decreaseItemCount({
        id: selectedCartLineId,
      }),
    );
  };
  const increment = () => {
    if (!selectedCartLineId) return;

    dispatch(
      increaseItemCount({
        id: selectedCartLineId,
      }),
    );
  };

  const handleAddToCart = () => {
    // Changed: the PDP and quick-add now enforce the same option-selection rules.
    const missingVariants = requiredVariants.filter(
      (type) => !selectedVariants[type],
    );

    if (missingVariants.length > 0) {
      toast.warning("Please select all options", {
        description: `Please select: ${missingVariants.join(", ")}`,
      });
      return;
    }

    dispatch(
      addItem({
        // Changed: persist the selected option values in the cart payload.
        id: buildCartLineId(product.id, selectedVariants),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        maxQuantity: 5,
        quantity: 1,
        variant: selectedVariants,
      }),
    );
    toast.success("Added to cart", {
      description: `${product.name}  added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      description: `${product.name} has been ${
        isWishlisted ? "removed from" : "added to"
      } your wishlist.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied", {
        description: "Product link copied to clipboard.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{product.brand}</Badge>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleWishlistToggle}>
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? "fill-current text-red-500" : ""
                }`}
              />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        {product.badge && (
          <Badge variant={getBadgeVariant(product.badge)} className="mb-3">
            {product.badge}
          </Badge>
        )}
        <div className="flex items-center gap-2 mb-4">
          {renderStars(product.rating)}
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount} reviews)
          </span>
        </div>
      </div>
      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">${product.price}</span>
        {product.originalPrice && (
          <span className="text-xl text-muted-foreground line-through">
            ${product.originalPrice}
          </span>
        )}
        {product.originalPrice && (
          <Badge variant="destructive">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </Badge>
        )}
      </div>
      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">
        {product.description}
      </p>
      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            product.inStock ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className={product.inStock ? "text-green-600" : "text-red-600"}>
          {product.inStock
            ? `In Stock (${product.stockCount} available)`
            : "Out of Stock"}
        </span>
      </div>
      {/* Variants */}
      {product.variants.length > 0 && (
        <ProductVariantPicker
          variants={product.variants}
          selectedVariants={selectedVariants}
          onVariantChange={setSelectedVariants}
        />
      )}
      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        {cartValues && (
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Quantity:</label>
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={decrement}
                disabled={cartValues.quantity <= 1}
              >
                -
              </Button>
              <span className="px-4 py-2 min-w-12 text-center">
                {cartValues.quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={increment}
                disabled={cartValues.quantity >= product.stockCount}
              >
                +
              </Button>
            </div>
          </div>
        )}
        {!cartValues && (
          <Button
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        )}
      </div>
      {/* Features */}
      <div className="grid grid-cols-3 gap-4 pt-6">
        <div className="text-center space-y-2">
          <Truck className="w-8 h-8 mx-auto text-muted-foreground" />
          <div className="text-xs">
            <div className="font-medium">Free Shipping</div>
            <div className="text-muted-foreground">Orders over $50</div>
          </div>
        </div>
        <div className="text-center space-y-2">
          <RefreshCw className="w-8 h-8 mx-auto text-muted-foreground" />
          <div className="text-xs">
            <div className="font-medium">Free Returns</div>
            <div className="text-muted-foreground">30-day return</div>
          </div>
        </div>
        <div className="text-center space-y-2">
          <Shield className="w-8 h-8 mx-auto text-muted-foreground" />
          <div className="text-xs">
            <div className="font-medium">Warranty</div>
            <div className="text-muted-foreground">1-year warranty</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
