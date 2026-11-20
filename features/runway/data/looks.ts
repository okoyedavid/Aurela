import { runwayProducts } from "../../../data/catalog/runway-products.ts";

const [ivorySuit, monochromeSet, noirGown, champagneGown, heels, tote, oxford, watch] = runwayProducts;

export const runwayLooks = [
  { id: "ivory", title: "A study in ivory", note: "Clean lines. Quiet confidence.", collection: "The modern wardrobe", model: "woman-tailored", silhouette: "tailored", garmentMaterials: ["Suit"], baseColor: "Ivory", products: [ivorySuit, heels, tote] },
  { id: "monochrome", title: "Perfectly undone", note: "An effortless balance of form and freedom.", collection: "The everyday edit", model: "man-casual", silhouette: "casual", garmentMaterials: ["Shirt", "Pants"], baseColor: null, products: [monochromeSet, oxford, watch] },
  { id: "noir", title: "After hours", note: "A little drama. An enduring impression.", collection: "The occasion edit", model: "woman-gown", silhouette: "gown", garmentMaterials: ["Bodice", "Dress"], baseColor: "Black", products: [noirGown, heels, tote] },
  { id: "champagne", title: "Poetry in motion", note: "Soft movement, unforgettable presence.", collection: "The occasion edit", model: "woman-gown", silhouette: "gown", garmentMaterials: ["Bodice", "Dress"], baseColor: "Champagne", products: [champagneGown, heels, watch] },
] as const;
