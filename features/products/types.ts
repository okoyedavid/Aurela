export interface Filters {
  query: string;
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  sortBy: SortBy;
  tags: string[];
  rating: number;
}

export type SortBy = "name" | "price" | "rating" | "newest" | "popularity";
export type Status = "idle" | "loading" | "succeeded" | "failed";

export interface RelatedProductsOptions {
  matchBy: "category" | "brand" | "both" | "tags";
  limit?: number;
  excludeCurrent?: boolean; // default: true
  sortBy?: "popularity" | "rating" | "price" | "random";
  fallback?: boolean; // Show popular products if no matches
}
