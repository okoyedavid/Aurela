import assert from "node:assert/strict";
import { test } from "node:test";
import { getColorHex, getProductColors, resolveProductColor } from "../../features/products/lib/product-colors.ts";
import { runwayProducts } from "../../data/catalog/runway-products.ts";

test("products without color variants do not acquire color choices", () => {
  const product = runwayProducts.find((item) => item.id === "runway-monochrome-set");
  assert.deepEqual(getProductColors(product), []);
  assert.equal(resolveProductColor(product, "Navy"), undefined);
});

test("unavailable and stale colors resolve to an available catalog option", () => {
  const product = runwayProducts.find((item) => item.id === "runway-noir-gown");
  assert.equal(resolveProductColor(product, "Forest Green")?.value, "Black");
  assert.equal(resolveProductColor(product, "Removed color")?.value, "Black");
  assert.equal(resolveProductColor(product, "Burgundy")?.value, "Burgundy");
  assert.equal(resolveProductColor({ ...product, variants: product.variants.map((item) => ({ ...item, available: false })) }), undefined);
});

test("named colors, CSS values and explicit descriptive swatches resolve accurately", () => {
  assert.equal(getColorHex("Dusty Rose"), "#bc7f88");
  assert.equal(getColorHex("Royal Blue"), "#4169e1");
  assert.equal(getColorHex("Ocean Mist", "#41b5a3"), "#41b5a3");
  assert.equal(getColorHex("#abc"), "#aabbcc");
  assert.equal(getColorHex("rgba(20, 40, 60, 0.5)"), null);
  assert.equal(getColorHex("Unspecified custom shade"), null);
});

test("only color variants are exposed and duplicate values are removed", () => {
  const product = runwayProducts[0];
  const color = getProductColors(product)[0];
  assert.equal(getProductColors({ ...product, variants: [...product.variants, { ...color, id: "duplicate", value: color.value.toLowerCase() }] }).length, 4);
  assert.ok(getProductColors(product).every((item) => item.type === "color"));
});

