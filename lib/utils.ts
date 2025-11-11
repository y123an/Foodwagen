import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * generatePageTitle
 * Helper to produce a page title using the global template. Falls back to default.
 */
export function generatePageTitle(title?: string) {
  if (!title) return "FoodWagen";
  return `${title} | FoodWagen`;
}

/**
 * buildJsonLdForFood
 * Create JSON-LD Product/Offer schema for a food item.
 */
export function buildJsonLdForFood(food: {
  id: string | number;
  name: string;
  image?: string;
  price?: string | number;
  rating?: number;
  restaurantName?: string;
  logo?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: food.name,
    ...(food.image ? { image: food.image } : {}),
    ...(food.restaurantName ? { provider: { '@type': 'Organization', name: food.restaurantName, ...(food.logo ? { logo: food.logo } : {}) } } : {}),
    ...(food.price ? { offers: { '@type': 'Offer', price: String(food.price), priceCurrency: 'USD' } } : {}),
    ...(food.rating ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: food.rating } } : {}),
    identifier: String(food.id),
  };
}
 
