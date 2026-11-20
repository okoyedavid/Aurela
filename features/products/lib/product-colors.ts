import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import type { ProductProps, ProductVariantProps } from "@/types/products";

extend([namesPlugin]);

const namedColors: Record<string, string> = {
  ivory: "#eee9dc", champagne: "#c9aa79", sage: "#879b86",
  burgundy: "#782f40", "forest green": "#264b38", "dusty rose": "#bc7f88",
  "midnight blue": "#27354d", "navy blue": "#25334c", navy: "#25334c",
  "light blue": "#add8e6", "classic blue": "#4169e1", beige: "#c7b397",
};

export function getColorHex(value: string, explicitHex?: string): string | null {
  const input = explicitHex ?? namedColors[value.trim().toLowerCase()] ?? value.replaceAll(" ", "");
  const color = colord(input);
  return color.isValid() && color.alpha() === 1 ? color.toHex() : null;
}

export function getProductColors(product: ProductProps): ProductVariantProps[] {
  const seen = new Set<string>();
  return product.variants.filter((variant) => {
    if (!["color", "colour"].includes(variant.type.toLowerCase())) return false;
    const key = variant.value.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function resolveProductColor(product: ProductProps, selected?: string): ProductVariantProps | undefined {
  const colors = getProductColors(product);
  return colors.find((color) => color.value === selected && color.available)
    ?? colors.find((color) => color.available);
}
