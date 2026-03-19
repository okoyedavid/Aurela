"use client";
import FashionCard from "@/components/FashionCard";

export default function Subcategories({ category }: { category: string }) {
  const subcategories = getSubcategories(category);

  if (subcategories.length < 1) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl md:text-3xl font-semibold mb-6">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subcategories.map((subcategory, index) => (
          <FashionCard
            key={index}
            title={subcategory.name}
            subtitle={String(subcategory.count)}
            image={subcategory.image}
          />
        ))}
      </div>
    </div>
  );
}

// Helper function to generate subcategories
function getSubcategories(categoryName: string) {
  const subcategoryMap: Record<
    string,
    Array<{
      name: string;
      count: number;
      image: string;
    }>
  > = {
    "Women's Clothing": [
      {
        image: "/products/squattingmodel.jpeg",
        name: "Dresses",
        count: 15,
      },
      {
        image: "/products/weddingredDress.jpeg",
        name: "Tops",
        count: 12,
      },
      {
        image: "/products/model.jpeg",
        name: "Bottoms",
        count: 8,
      },
      {
        image: "/products/accessories.jpeg",
        name: "Outerwear",
        count: 6,
      },
    ],

    "Men's Clothing": [
      {
        image: "/products/squattingmodel.jpeg",
        name: "Shirts",
        count: 12,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Pants",
        count: 10,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Outerwear",
        count: 8,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Suits",
        count: 3,
      },
    ],

    Shoes: [
      {
        image: "/products/squattingmodel.jpeg",
        name: "Sneakers",
        count: 10,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Boots",
        count: 8,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Sandals",
        count: 5,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Formal",
        count: 4,
      },
    ],

    Accessories: [
      {
        image: "/products/squattingmodel.jpeg",
        name: "Watches",
        count: 8,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Sunglasses",
        count: 6,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Belts",
        count: 4,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Hats",
        count: 4,
      },
    ],

    Bags: [
      {
        image: "/products/squattingmodel.jpeg",
        name: "Handbags",
        count: 8,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Backpacks",
        count: 5,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Wallets",
        count: 3,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Travel",
        count: 2,
      },
    ],

    Jewelry: [
      {
        image: "/products/squattingmodel.jpeg",
        name: "Necklaces",
        count: 5,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Earrings",
        count: 4,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Rings",
        count: 3,
      },
      {
        image: "/products/squattingmodel.jpeg",
        name: "Bracelets",
        count: 3,
      },
    ],
  };

  return subcategoryMap[categoryName] || [];
}
