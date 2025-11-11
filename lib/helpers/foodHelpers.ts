import { Food } from "../validations/food.schema"; 

/**
 * Extracts restaurant information from a food item
 * Handles both nested and flat restaurant data structures from different API responses
 * 
 * @param food - Food item from API
 * @returns Restaurant information including name, logo, and status
 */
export function getRestaurantInfo(food: Food) {
  return {
    name: food.restaurant?.name || food.restaurantName || food.restaurant_name || "Unknown Restaurant",
    logo: food.restaurant?.logo || food.logo || food.restaurant_logo || "",
    status: food.restaurant?.status || food.status || food.restaurant_status || "Unknown",
  };
}

/**
 * Extracts and normalizes food information with proper field mapping
 * Handles different field naming conventions from various API endpoints
 * 
 * @param food - Food item from API
 * @returns Normalized food information
 */
export function getFoodInfo(food: Food) {
  return {
    id: food.id,
    name: food.food_name || food.name,
    image: food.food_image || food.image,
    price: food.food_price || food.Price,
    rating: typeof food.food_rating === 'string' 
      ? parseFloat(food.food_rating.replace('⭐', '')) 
      : (food.food_rating || food.rating || 0),
  };
}

/**
 * Formats price string with currency symbol
 * 
 * @param price - Price value with or without currency symbol
 * @returns Formatted price string with $ symbol
 */
export function formatPrice(price: string): string {
  const cleanPrice = price.replace('$', '');
  return `$${cleanPrice}`;
}

/**
 * Determines if a restaurant is currently open based on status string
 * 
 * @param status - Restaurant status string
 * @returns Boolean indicating if restaurant is open
 */
export function isRestaurantOpen(status?: string): boolean {
  if (!status) return false;
  const lowerStatus = status.toLowerCase();
  return lowerStatus.includes('open');
}

/**
 * Returns the appropriate status color class name
 * 
 * @param status - Restaurant status string
 * @returns Color identifier for styling
 */
export function getStatusColor(status?: string): string {
  return isRestaurantOpen(status) ? "green" : "red";
}
