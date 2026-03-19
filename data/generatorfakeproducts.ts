import { ProductProps } from "@/types/products";

const random = (max: number) => Math.floor(Math.random() * max);
const randomItem = <T>(arr: T[]): T => arr[random(arr.length)];
const randomPrice = () => Math.floor(Math.random() * 500) + 20;
const randomRating = () => Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0 - 5.0
const randomReviews = () => Math.floor(Math.random() * 200) + 1;
const randomStock = () => Math.floor(Math.random() * 50) + 1;

// Base templates for generating variations
export const categories = [
  "Women's Clothing",
  "Men's Clothing",
  "Shoes",
  "Accessories",
  "Bags",
  "Jewelry",
  "Electronics",
  "Sports & Outdoors",
  "Home & Kitchen",
  "Beauty & Personal Care",
];

export const subcategories = {
  "Women's Clothing": [
    "Dresses",
    "Tops",
    "Pants",
    "Skirts",
    "Jackets",
    "Sweaters",
  ],
  "Men's Clothing": [
    "Shirts",
    "Pants",
    "Jackets",
    "Suits",
    "T-Shirts",
    "Hoodies",
  ],
  Shoes: ["Sneakers", "Boots", "Sandals", "Loafers", "Heels", "Flats"],
  Accessories: ["Watches", "Belts", "Sunglasses", "Hats", "Scarves", "Gloves"],
  Bags: [
    "Handbags",
    "Backpacks",
    "Briefcases",
    "Clutches",
    "Tote Bags",
    "Crossbody",
  ],
  Jewelry: ["Necklaces", "Bracelets", "Earrings", "Rings", "Anklets"],
  Electronics: ["Phones", "Laptops", "Tablets", "Headphones", "Smartwatches"],
  "Sports & Outdoors": ["Yoga", "Running", "Cycling", "Camping", "Swimming"],
  "Home & Kitchen": ["Cookware", "Appliances", "Decor", "Bedding", "Storage"],
  "Beauty & Personal Care": [
    "Skincare",
    "Makeup",
    "Haircare",
    "Fragrance",
    "Tools",
  ],
};

export const brands = [
  "StyleCo",
  "DenimCo",
  "FootCraft",
  "TimeElegant",
  "LuxeBags",
  "CasualWear",
  "PremiumFit",
  "UrbanStyle",
  "ClassicThread",
  "ModernTrend",
  "EliteWear",
  "ComfortZone",
  "TrendSetter",
  "QualityFirst",
  "DesignerHub",
  "FashionForward",
  "SmartTech",
  "ActiveLife",
  "HomeComfort",
  "BeautyEssence",
];

export const adjectives = [
  "Elegant",
  "Classic",
  "Modern",
  "Vintage",
  "Premium",
  "Luxury",
  "Casual",
  "Professional",
  "Sporty",
  "Minimalist",
  "Bold",
  "Sleek",
  "Comfortable",
  "Stylish",
  "Trendy",
  "Timeless",
  "Designer",
  "Essential",
  "Versatile",
];

export const productTypes = [
  "Dress",
  "Shirt",
  "Jacket",
  "Pants",
  "Shoes",
  "Bag",
  "Watch",
  "Hat",
  "Sweater",
  "Coat",
  "Blazer",
  "Jeans",
  "Sneakers",
  "Boots",
  "Necklace",
  "Bracelet",
  "Ring",
  "Sunglasses",
  "Belt",
  "Scarf",
  "Backpack",
  "Wallet",
];

const tagOptions = [
  ["summer", "casual", "lightweight", "breathable"],
  ["winter", "warm", "cozy", "layering"],
  ["elegant", "formal", "professional", "sophisticated"],
  ["athletic", "performance", "sports", "active"],
  ["vintage", "retro", "classic", "timeless"],
  ["modern", "contemporary", "trendy", "stylish"],
  ["minimalist", "simple", "clean", "essential"],
  ["luxury", "premium", "designer", "exclusive"],
  ["comfortable", "soft", "relaxed", "everyday"],
  ["durable", "quality", "long-lasting", "sturdy"],
];

const badges = [
  "Sale",
  "New",
  "Popular",
  "Limited",
  "Bestseller",
  "Featured",
  "Hot",
  "Trending",
];

const images = [
  "/products/men.jpeg",
  "/products/women.jpeg",
  "/products/simpleman.jpeg",
  "/products/weddingredDress.jpeg",
  "/products/formalwear.jpeg",
  "/products/cultural.jpeg",
  "/products/tobi.jpeg",
  "/categories/Asher ™ _ Casual Leather Jacket.jpeg",
  "/categories/shoes.jpeg",
  "/categories/dress.jpeg",
  "/categories/watch.jpeg",
  "/categories/briefcase.jpeg",
  "/categories/Category_Sneakers; Upper Materials_PU….jpeg",
  "/categories/female_red_dress.jpeg",
  "/categories/handbag.jpeg",
  "/categories/jacket.jpeg",
  "/categories/suits.jpeg",
  "/categories/Our luxurious briefcase with hand polished leather….jpeg",
  "/categories/Overview_ Unique design, stylish and beautiful….jpeg",
  "/categories/UK01 Oxford Shoes Men Overview_The UK01 Oxford….jpeg",
  "/categories/ankara.jpeg",
  "/categories/nike.jpeg",
  "/categories/jordan.jpeg",
  "/categories/heels.jpeg",
  "/categories/suits2.jpeg",
  "/categories/blackdress.jpeg",
];

const unsplashImages = [
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
  "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80",
  "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80",
  "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
];

export function generateProducts(count: number): ProductProps[] {
  const products: ProductProps[] = [];

  for (let i = 1; i <= count; i++) {
    const category = randomItem(categories);
    const subcategoryList =
      subcategories[category as keyof typeof subcategories];
    const subcategory = randomItem(subcategoryList);
    const brand = randomItem(brands);
    const adjective = randomItem(adjectives);
    const productType = randomItem(productTypes);
    const price = randomPrice();
    const hasDiscount = Math.random() > 0.7;
    const originalPrice = hasDiscount ? Math.floor(price * 1.3) : undefined;
    const tags = randomItem(tagOptions);
    const rating = randomRating();
    const reviewCount = randomReviews();
    const stockCount = randomStock();
    const badge = Math.random() > 0.6 ? randomItem(badges) : undefined;
    const featured = Math.random() > 0.8;

    const mainImage = randomItem(images);
    const productImages = [
      mainImage,
      randomItem(unsplashImages),
      randomItem(unsplashImages),
    ];

    // Generate variants
    const variants = [];

    // Size variants (for clothing/shoes)
    if (category.includes("Clothing") || category === "Shoes") {
      const sizes =
        category === "Shoes"
          ? ["7", "8", "9", "10", "11", "12"]
          : ["XS", "S", "M", "L", "XL", "XXL"];

      sizes.forEach((size) => {
        variants.push({
          id: `size-${size.toLowerCase()}-${i}`,
          name: "Size",
          type: "size" as const,
          value: size,
          available: Math.random() > 0.2, // 80% availability
        });
      });
    }

    // Color variants
    const colors = [
      "Black",
      "White",
      "Navy Blue",
      "Gray",
      "Brown",
      "Beige",
      "Red",
      "Green",
    ];
    const numColors = Math.floor(Math.random() * 4) + 2; // 2-5 colors

    for (let c = 0; c < numColors; c++) {
      const color = colors[c % colors.length];
      variants.push({
        id: `color-${color.toLowerCase().replace(" ", "-")}-${i}`,
        name: "Color",
        type: "color" as const,
        value: color,
        available: Math.random() > 0.15, // 85% availability
      });
    }

    const product: ProductProps = {
      id: i.toString(),
      name: `${adjective} ${productType}`,
      image: mainImage,
      description: `High-quality ${productType.toLowerCase()} from ${brand}. Perfect for ${
        tags[0]
      } occasions. Crafted with attention to detail and premium materials for lasting comfort and style.`,
      price,
      originalPrice,
      images: productImages,
      category,
      subcategory,
      brand,
      tags,
      variants,
      specifications: {
        Material: category.includes("Clothing")
          ? "Premium Cotton Blend"
          : "High-Quality Materials",
        "Care Instructions": "Follow care label",
        Origin: randomItem([
          "Made in Italy",
          "Made in USA",
          "Made in Portugal",
          "Made in Japan",
        ]),
        Fit: category.includes("Clothing")
          ? randomItem(["Slim Fit", "Regular Fit", "Relaxed Fit"])
          : undefined,
      },
      inStock: stockCount > 0,
      stockCount,
      rating,
      reviewCount,
      badge,
      featured,
    };

    products.push(product);
  }

  return products;
}
