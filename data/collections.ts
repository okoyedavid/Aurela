export const curatedCollections = {
  "new-language": { name: "The New Language", eyebrow: "Editorial 01", description: "Modern pieces where restraint, character and considered craft meet.", image: "/auth/men-3.jpg", tags: ["new", "trending", "premium"] },
  "occasion-edit": { name: "The Occasion Edit", eyebrow: "Seasonal collection", description: "Tailoring, dresses and finishing pieces selected for memorable arrivals.", image: "/products/weddingredDress.jpeg", categories: ["Women's Clothing", "Men's Clothing"], tags: ["formal", "elegant", "luxury"] },
  "daily-forms": { name: "Daily Forms", eyebrow: "Aurela essentials", description: "Quiet foundations designed for repeat wear and lasting relevance.", image: "/products/simpleman.jpeg", tags: ["casual", "comfortable", "classic"] },
} as const;
export type CollectionSlug = keyof typeof curatedCollections;
