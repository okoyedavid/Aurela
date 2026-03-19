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
    <div className={`flex items-start space-x-4 py-4 ${className}`}>
      <div className="shrink-0 relative h-20 w-20">
        <Image
          fill
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-md object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {item.name}
        </h3>

        {item.variant && (
          <div className="mt-1 text-sm text-gray-500">
            {Object.entries(item.variant)
              .filter(([_, value]) => value)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ")}
          </div>
        )}

        <div className="mt-2 flex items-center space-x-3">
          <div className="flex items-center border rounded-md">
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
            className="h-8 w-8 text-red-500 hover:text-red-700"
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

      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
      </div>
    </div>
  );
};
