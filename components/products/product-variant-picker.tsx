"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ProductVariantProps } from "@/types/products";
import { getColorHex } from "@/features/products/lib/product-colors";

export type SelectedProductVariants = Record<string, string>;

interface ProductVariantPickerProps {
  variants: ProductVariantProps[];
  selectedVariants: SelectedProductVariants;
  onVariantChange: (selectedVariants: SelectedProductVariants) => void;
  className?: string;
}
export default function ProductVariantPicker({
  variants,
  selectedVariants,
  onVariantChange,
  className = "",
}: ProductVariantPickerProps) {
  const variantGroups = variants.reduce<Record<string, ProductVariantProps[]>>(
    (groups, variant) => {
      if (!groups[variant.type]) {
        groups[variant.type] = [];
      }

      groups[variant.type].push(variant);
      return groups;
    },
    {},
  );

  const handleVariantSelect = (type: string, value: string) => {
    onVariantChange({
      ...selectedVariants,
      [type]: value,
    });
  };

  if (Object.keys(variantGroups).length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {Object.entries(variantGroups).map(([type, typeVariants]) => (
        <div key={type} className="space-y-3">
          <div className="flex items-center justify-between"><Label className="text-sm font-medium">
            {getVariantDisplayName(type)}
            {selectedVariants[type] && (
              <span className="ml-2 font-normal text-muted-foreground">
                - {selectedVariants[type]}
              </span>
            )}
          </Label>{type === "size" && <button type="button" className="text-xs text-muted-foreground underline underline-offset-4">Size guide</button>}</div>

          {type === "color" ? (
            <div className="flex flex-wrap gap-2">
              {typeVariants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => handleVariantSelect(type, variant.value)}
                  disabled={!variant.available}
                  aria-label={`${variant.value}${!variant.available ? " (out of stock)" : ""}`}
                  aria-pressed={selectedVariants[type] === variant.value}
                  className={`h-11 w-11 rounded-full border-2 transition-all ${
                    selectedVariants[type] === variant.value
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-foreground/40"
                  } ${
                    !variant.available
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                  style={{
                    backgroundColor: getColorHex(variant.value, variant.colorHex) ?? "#9ca3af",
                  }}
                  title={`${variant.value}${
                    !variant.available ? " (Out of Stock)" : ""
                  }`}
                >
                  {!variant.available && (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-red-500/20">
                      <div className="h-0.5 w-4 rotate-45 bg-red-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {typeVariants.map((variant) => (
                <Button
                  key={variant.id}
                  type="button"
                  variant={
                    selectedVariants[type] === variant.value
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => handleVariantSelect(type, variant.value)}
                  disabled={!variant.available}
                  className={`h-11 min-w-12 rounded-full ${!variant.available ? "opacity-50" : ""}`}
                >
                  {variant.value}
                  {!variant.available && (
                    <Badge variant="destructive" className="ml-2 text-xs">
                      Out
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          )}

          {selectedVariants[type] &&
            typeVariants.find(
              (variant) =>
                variant.value === selectedVariants[type] && !variant.available,
            ) && (
              <div className="text-sm text-destructive">
                This {type} is currently out of stock
              </div>
            )}
        </div>
      ))}
    </div>
  );
}

export function getRequiredVariantTypes(variants: ProductVariantProps[]) {
  return [...new Set(variants.map((variant) => variant.type))];
}

export function buildCartLineId(
  productId: string,
  selectedVariants: SelectedProductVariants,
) {
  return [
    productId,
    selectedVariants.size ?? "",
    selectedVariants.color ?? "",
    selectedVariants.material ?? "",
  ].join(":");
}

function getVariantDisplayName(type: string) {
  switch (type) {
    case "size":
      return "Size";
    case "color":
      return "Color";
    case "material":
      return "Material";
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
}
