import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  decreaseItemCount,
  increaseItemCount,
} from "@/features/Cart/cartSlice";
import { CartItem as CartItemType } from "@/types/cart";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  className?: string;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  className,
}) => {
  const dispatch = useDispatch();
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value) || 0;
    onUpdateQuantity(item.id, quantity);
  };

  const increment = () =>
    dispatch(
      increaseItemCount({
        id: item.id,
      })
    );
  const decrement = () =>
    dispatch(
      decreaseItemCount({
        id: item.id,
      })
    );
  return (
    <div className={`flex items-start gap-4 py-6 sm:gap-6 ${className}`}>
      <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#e9e3d9] sm:h-36 sm:w-28">
        <Image
          fill
          src={item.image}
          alt={item.name}
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="truncate text-base font-medium text-[#171717] sm:text-lg">
          {item.name}
        </h3>

        {item.variant && (
          <div className="mt-1 text-sm capitalize text-[#827a70]">
            {Object.entries(item.variant)
              .filter(([_, value]) => value)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ")}
          </div>
        )}

        <div className="mt-2 flex items-center space-x-3">
          <div className="flex items-center rounded-full border border-[#d9d1c5] bg-white">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={decrement}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={item.quantity}
              onChange={handleQuantityChange}
              className="h-8 w-16 text-center border-0 p-0"
              min="1"
              max={item.maxQuantity}
            />

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={increment}
              disabled={item.quantity >= item.maxQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#81796f] hover:bg-[#eee9df] hover:text-black"
            onClick={() => onRemove(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {item.quantity >= item.maxQuantity && (
          <p className="mt-1 text-xs text-amber-600">
            Maximum quantity available: {item.maxQuantity}
          </p>
        )}
      </div>

      <div className="ml-auto text-right">
        <p className="font-medium text-[#171717]">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
      </div>
    </div>
  );
};
