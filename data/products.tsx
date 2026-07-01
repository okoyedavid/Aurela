import { CategoryProps } from "@/types/category";
import {
  brands,
  categories as cat2,
  generateProducts,
} from "./generatorfakeproducts";

const recommendations = [
  {
    name: "TWS Bujug",
    price: 29.9,
    rating: 5.0,
    reviews: 18,
    category: "Other",
    image:
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?w=200&h=200&fit=crop",
  },
  {
    name: "Headsound Baptis",
    price: 12.0,
    rating: 5.0,
    reviews: 18,
    category: "Music",
    image:
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?w=200&h=200&fit=crop",
  },
  {
    name: "Adudu Cleaner",
    price: 29.9,
    rating: 5.0,
    reviews: 18,
    category: "Music",
    image:
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?w=200&h=200&fit=crop",
  },
];

const reviews = [
  {
    id: "1",
    productId: "1",
    userName: "Sarah M.",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&q=80",
    rating: 5,
    title: "Perfect summer dress!",
    comment:
      "This dress is absolutely beautiful! The fabric is so soft and comfortable, and the fit is perfect. I received so many compliments when I wore it.",
    date: "2024-01-15",
    helpful: 12,
    verified: true,
  },
  {
    id: "2",
    productId: "1",
    userName: "Emily R.",
    userAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    rating: 4,
    title: "Great quality",
    comment:
      "Love the quality of this dress. Only reason for 4 stars is that it runs slightly small, so order a size up.",
    date: "2024-01-10",
    helpful: 8,
    verified: true,
  },
  {
    id: "3",
    productId: "3",
    userName: "Mike T.",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    title: "Excellent sneakers",
    comment:
      "These sneakers are incredibly comfortable and well-made. The leather quality is outstanding for the price.",
    date: "2024-01-20",
    helpful: 15,
    verified: true,
  },
  {
    id: "4",
    productId: "4",
    userName: "David L.",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
    title: "Beautiful watch",
    comment:
      "Exactly what I was looking for. Minimalist design, great quality, keeps perfect time.",
    date: "2024-01-18",
    helpful: 6,
    verified: true,
  },
  {
    id: "5",
    productId: "5",
    userName: "Jessica K.",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    title: "Luxury quality",
    comment:
      "This handbag exceeded my expectations. The leather is buttery soft and the craftsmanship is impeccable.",
    date: "2024-01-22",
    helpful: 9,
    verified: true,
  },
];

const categories: CategoryProps[] = [
  {
    id: "1",
    name: "Women's Clothing",
    count: 2,
    slug: "womens-clothing",
    description: "Modern silhouettes shaped for movement, presence and everyday distinction.",
    image: "/products/women.jpeg",
    productCount: 45,
    featured: true,
  },
  {
    id: "2",
    name: "Men's Clothing",
    count: null,
    slug: "mens-clothing",
    description: "Considered tailoring and relaxed essentials for a modern wardrobe.",
    image: "/products/men.jpeg",
    productCount: 38,
    featured: true,
  },
  {
    id: "7",
    name: "Kids' Clothing",
    count: null,
    slug: "kids-clothing",
    description: "Playful, durable pieces created for movement and discovery.",
    image: "/products/kids.jpeg",
    productCount: 38,
    featured: true,
  },
  {
    id: "3",
    name: "Shoes",
    count: null,
    slug: "shoes",
    description: "A considered foundation, from everyday forms to polished occasion pieces.",
    image: "/products/footwear.jpeg",
    productCount: 27,
    featured: true,
  },
  {
    id: "4",
    name: "Accessories",
    count: null,
    slug: "accessories",
    description: "Finishing details selected to bring character to every composition.",
    image: "/products/accessories.jpeg",
    productCount: 22,
    featured: true,
  },
  {
    id: "5",
    name: "Bags",
    count: null,
    slug: "bags",
    description: "Structured companions balancing utility, proportion and enduring form.",
    image: "/categories/handBag.jpeg",
    productCount: 18,
    featured: false,
  },
  {
    id: "6",
    name: "Jewelry",
    count: null,
    slug: "jewelry",
    description: "Quiet statements and sculptural accents designed to remain personal.",
    image: "/categories/watch.jpeg",
    productCount: 15,
    featured: false,
  },
];

export { categories, recommendations, reviews };

export const products = generateProducts(1000);

export const productStats = {
  total: products.length,
  byCategory: cat2.reduce((acc, cat) => {
    acc[cat] = products.filter((p) => p.category === cat).length;
    return acc;
  }, {} as Record<string, number>),
  byBrand: brands.reduce((acc, brand) => {
    acc[brand] = products.filter((p) => p.brand === brand).length;
    return acc;
  }, {} as Record<string, number>),
  averagePrice: Math.round(
    products.reduce((sum, p) => sum + p.price, 0) / products.length
  ),
  totalInStock: products.filter((p) => p.inStock).length,
  featured: products.filter((p) => p.featured).length,
  onSale: products.filter((p) => p.originalPrice).length,
};
