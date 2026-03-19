"use client";
import { CartItem } from "@/components/cart/CartItem";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  applyPromo,
  productRemoved,
  removePromo,
  selectAllCart,
  selectAppliedPromo,
  selectCartSubtotal,
  selectDiscountAmount,
  updateItemCount,
} from "@/features/Cart/cartSlice";
import { PromoCode } from "@/types/cart";
import { ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const PROMO_CODES: Record<string, PromoCode> = {
  SAVE10: { code: "SAVE10", type: "percentage", value: 10, minOrder: 50 },
  SAVE20: { code: "SAVE20", type: "percentage", value: 20, minOrder: 100 },
  WELCOME5: { code: "WELCOME5", type: "fixed", value: 5 },
};

const CartPage: React.FC = () => {
  const cart = useSelector(selectAllCart);
  const dispatch = useDispatch();
  const subtotal = useSelector(selectCartSubtotal);
  const appliedPromo = useSelector(selectAppliedPromo);
  const discountAmount = useSelector(selectDiscountAmount);

  const getTax = (): number => {
    return (subtotal - discountAmount) * 0.08; // 8% tax
  };

  const getShipping = (): number => {
    const subTotal = subtotal - discountAmount;
    return subTotal > 50 ? 0 : 9.99; // Free shipping over $50
  };

  const removeItem = (id: string) => dispatch(productRemoved(id));
  const updateQuantity = (id: string, quantity: number) =>
    dispatch(updateItemCount({ id, quantity }));

  const [promoInput, setPromoInput] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const applyPromoCode = (code: string) => {
    const promoCode = PROMO_CODES[code.toUpperCase()];
    if (!promoCode) return false;

    if (promoCode.minOrder && subtotal < promoCode.minOrder) return false;

    dispatch(applyPromo({ ...promoCode }));
    return true;
  };

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;

    setIsApplyingPromo(true);

    const success = applyPromoCode(promoInput.trim());

    if (success) {
      toast.success("Promo code applied!", {
        description: `${promoInput.toUpperCase()} has been applied to your order.`,
      });
      setPromoInput("");
    } else {
      toast.error("Invalid promo code", {
        description: "Please check the code and try again.",
      });
    }

    setIsApplyingPromo(false);
  };

  const getTotal = (): number => {
    return subtotal - discountAmount + getTax() + getShipping();
  };

  const handleRemovePromo = () => {
    dispatch(removePromo());

    toast("Promo code removed", {
      description: "The discount has been removed from your order.",
    });
  };

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Cart Items ({cart.length})
                </h2>

                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-8">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label
                    htmlFor="promo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Promo Code
                  </label>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">
                          {appliedPromo.code} -{" "}
                          {appliedPromo.type === "percentage"
                            ? `${appliedPromo.value}% off`
                            : `$${appliedPromo.value} off`}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemovePromo}
                        className="text-green-600 hover:text-green-800"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Input
                        id="promo"
                        placeholder="Enter code"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleApplyPromo()
                        }
                      />

                      <Button
                        onClick={handleApplyPromo}
                        disabled={!promoInput.trim() || isApplyingPromo}
                        variant="outline"
                      >
                        {isApplyingPromo ? "Applying..." : "Apply"}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount</span>
                      <span className="text-green-600 font-medium">
                        -${discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${getTax().toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {getShipping() === 0
                        ? "Free"
                        : `$${getShipping().toFixed(2)}`}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                {getShipping() === 0 && (
                  <p className="text-xs text-green-600 mt-2">
                    🎉 You qualify for free shipping!
                  </p>
                )}

                {subtotal < 50 && subtotal > 25 && (
                  <p className="text-xs text-amber-600 mt-2">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}

                {/* Checkout Button */}
                <Button asChild className="w-full mt-6" size="lg">
                  <Link
                    href="/checkout"
                    className="flex items-center justify-center"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full mt-3">
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
