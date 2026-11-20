import type { ProductProps } from "@/types/products";

function piece(
  id: string,
  name: string,
  price: number,
  image: string,
  category: string,
  sizes: string[] = [],
  colors: { name: string; hex: string; available?: boolean }[] = [],
): ProductProps {
  return {
    id: `runway-${id}`,
    name,
    price,
    image,
    images: [image],
    category,
    subcategory: category === "Shoes" ? "Heels" : "Runway edit",
    description: `${name}, selected for the Aurela runway edit. A considered statement in proportion, texture and effortless dressing.`,
    brand: "Aurela Studio",
    variants: [...sizes.map((size) => ({
      id: `${id}-${size}`,
      name: "Size",
      type: "size",
      value: size,
      available: true,
    })), ...colors.map((color) => ({
      id: `${id}-color-${color.name.toLowerCase().replaceAll(" ", "-")}`,
      name: "Color",
      type: "color",
      value: color.name,
      colorHex: color.hex,
      available: color.available ?? true,
    }))],
    specifications: { "Care Instructions": "Follow the care label", Fit: "Regular fit" },
    tags: ["runway", "curated", "studio"],
    inStock: true,
    stockCount: 12,
    rating: 4.8,
    reviewCount: 0,
    featured: true,
    createdAt: "2026-10-24T00:00:00.000Z",
    onSale: false,
  };
}

const clothingSizes = ["XS", "S", "M", "L", "XL"];
const ivorySuit = piece("ivory-suit", "The ivory tailored suit", 245, "/products/formalwear.jpeg", "Women's Clothing", clothingSizes, [
  { name: "Ivory", hex: "#eee9dc" }, { name: "Navy", hex: "#25334c" },
  { name: "Sage", hex: "#879b86" }, { name: "Black", hex: "#202222" },
]);
const monochromeSet = piece("monochrome-set", "The monochrome trouser set", 145, "/products/tobi.jpeg", "Men's Clothing", clothingSizes);
const noirGown = piece("noir-gown", "The noir evening gown", 285, "/auth/women-4.jpg", "Women's Clothing", clothingSizes, [
  { name: "Black", hex: "#202222" }, { name: "Burgundy", hex: "#782f40" },
  { name: "Forest Green", hex: "#264b38", available: false },
]);
const champagneGown = piece("champagne-gown", "The champagne halter gown", 320, "/auth/women.jpg", "Women's Clothing", clothingSizes, [
  { name: "Champagne", hex: "#c9aa79" }, { name: "Dusty Rose", hex: "#bc7f88" },
  { name: "Midnight Blue", hex: "#27354d" },
]);
const heels = piece("sculpted-heels", "The barely-there heel", 95, "/categories/heels.jpeg", "Shoes", ["36", "37", "38", "39", "40", "41"]);
const tote = piece("structured-tote", "The structured leather tote", 165, "/categories/handBag.jpeg", "Bags");
const oxford = piece("leather-oxford", "The leather oxford", 125, "/categories/UK01 Oxford Shoes Men Overview_The UK01 Oxford….jpeg", "Shoes", ["40", "41", "42", "43", "44", "45"]);
const watch = piece("classic-watch", "The classic timepiece", 180, "/categories/watch.jpeg", "Accessories");

export const runwayProducts = [ivorySuit, monochromeSet, noirGown, champagneGown, heels, tote, oxford, watch];

