/**
 * Food Types
 * Centralized type definitions for food-related data structures
 */

import { z } from "zod";
import { foodSchema, createFoodSchema, updateFoodSchema, restaurantSchema } from "../validations/food.schema";

/**
 * Restaurant Type
 * Represents restaurant information
 */
export type Restaurant = z.infer<typeof restaurantSchema>;

/**
 * Food Type
 * Represents a complete food item with all properties
 */
export type Food = z.infer<typeof foodSchema>;

/**
 * CreateFood Type
 * Type for creating new food items
 */
export type CreateFood = z.infer<typeof createFoodSchema>;

/**
 * UpdateFood Type
 * Type for updating existing food items (all fields optional)
 */
export type UpdateFood = z.infer<typeof updateFoodSchema>;

/**
 * Food Status Type
 * Represents whether a restaurant/food item is currently open
 */
export type FoodStatus = "Open Now" | "Closed";

/**
 * Food Item Type
 * Simplified food item structure used in UI components
 */
export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  rating: number;
  brandColor?: string;
  brandBg?: string;
  logo?: string;
  isOpen?: boolean;
}

/**
 * Food Form Values Type
 * Type for food form input values
 */
export type FoodFormValues = {
  name: string;
  rating?: number | "";
  imageUrl?: string;
  price?: string;
  restaurantName?: string;
  logo?: string;
  status?: FoodStatus;
};

/**
 * Food Card Props Type
 * Props for FoodCard component
 */
export type FoodCardProps = {
  food: FoodItem;
  foodData?: Food;
};
