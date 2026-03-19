export type ProductVariantProps = {
  id: string;
  name: string;
  type: string;
  value: string;
  available: boolean;
};

export type ProductSpecifications = {
  Material?: string;
  Movement?: string;
  "Case Diameter"?: string;
  Sole?: string;
  Lining?: string;
  Weight?: string;
  "Water Resistance"?: string;
  Warranty?: string;
  "Care Instructions"?: string;
  Dimensions?: string;
  Hardware?: string;
  Interior?: string;
  Origin?: string;
  Fit?: string;
};

export type ProductProps = {
  id: string;
  images: string[];
  name: string;
  price: number;
  description: string;
  originalPrice?: number;
  category: string;
  image: string;
  subcategory: string;
  brand: string;
  variants: ProductVariantProps[];
  specifications: ProductSpecifications;
  tags: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  featured: boolean;
};

export type ProductsArray = {
  products: ProductProps[];
};

export type ProductPage = {
  product: ProductProps;
};
