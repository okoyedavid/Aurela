import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBadgeVariant = (badge: string) => {
  switch (badge) {
    case "Sale":
      return "destructive";
    case "New":
      return "default";
    case "Popular":
      return "secondary";
    case "Limited":
      return "outline";
    default:
      return "secondary";
  }
};

export const normalizeString = (str: string): string =>
  str.toLowerCase().trim();

export const matchesQuery = (
  value: string | undefined | null,
  query: string
): boolean => {
  if (!value) return false;
  return normalizeString(value).includes(query);
};
const randomizedHeights = new Map<string, number>();

export function getRandomHeight(id: string) {
  if (!randomizedHeights.has(id)) {
    randomizedHeights.set(id, Math.random() * 0.5 + 1);
  }
  return randomizedHeights.get(id)!;
}
