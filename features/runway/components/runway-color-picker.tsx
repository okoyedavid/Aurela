"use client";

import styles from "../styles/runway.module.css";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getColorHex, getProductColors } from "@/features/products/lib/product-colors";
import { cn } from "@/lib/utils";
import type { ProductProps } from "@/types/products";

export default function RunwayColorPicker({ product, value, onChange, preview }: { product: ProductProps; value?: string; onChange: (value: string) => void; preview: boolean }) {
  const colors = getProductColors(product);
  if (colors.length === 0) return null;
  return (
    <div className={styles["runway-colors"]}>
      <p>Color <span aria-live="polite">{value ?? "Unavailable"}</span></p>
      <RadioGroup value={value ?? ""} onValueChange={onChange} aria-label={`Color for ${product.name}`} className={styles["runway-swatches"]}>
        {colors.map((color) => <label key={color.id} className={cn(styles["runway-swatch"], (!color.available || !product.inStock) && styles["is-unavailable"])} title={`${color.value}${!color.available ? " — out of stock" : ""}`}>
          <RadioGroupItem value={color.value} disabled={!color.available || !product.inStock} aria-label={`${color.value}${!color.available ? " (out of stock)" : ""}`} className={styles["runway-swatch-input"]} />
          <span aria-hidden="true" style={{ backgroundColor: getColorHex(color.value, color.colorHex) ?? "var(--muted)" }} />
        </label>)}
      </RadioGroup>
      {preview && <small>Preview color on the model</small>}
    </div>
  );
}
