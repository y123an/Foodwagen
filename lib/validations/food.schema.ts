import { z } from "zod";

/**
 * Restaurant Schema
 * Defines the structure for nested restaurant information within food items
 */
export const restaurantSchema = z.object({
  name: z.string().min(1, "Restaurant name is required"),
  logo: z.string().url("Invalid logo URL").optional(),
  status: z.string().optional(),
});

/**
 * Food Schema
 * Comprehensive schema that supports multiple API field naming conventions
 * Handles both nested and flat restaurant data structures
 */
export const foodSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Food name is required"),
  image: z.string().url("Invalid image URL"),
  Price: z.string().min(1, "Price is required"),
  rating: z.number().min(0).max(5).optional(),
  open: z.boolean().optional(),
  status: z.string().optional(),
  
  restaurantName: z.string().optional(),
  logo: z.string().url().optional(),
  restaurant: restaurantSchema.optional(),
  
  food_name: z.string().optional(),
  food_rating: z.union([z.string(), z.number()]).optional(),
  food_price: z.string().optional(),
  food_image: z.string().optional(),
  restaurant_name: z.string().optional(),
  restaurant_logo: z.string().optional(),
  restaurant_status: z.string().optional(),
  
  avatar: z.string().optional(),
  createdAt: z.string().optional(),
});

/**
 * Create Food Schema
 * Validation schema for creating new food items
 */
export const createFoodSchema = z.object({
  name: z.string().min(1, "Food name is required"),
  image: z.string().url("Invalid image URL"),
  Price: z.string().min(1, "Price is required"),
  rating: z.number().min(0).max(5).optional().default(0),
  restaurantName: z.string().min(1, "Restaurant name is required"),
  logo: z.string().url("Restaurant logo URL is required").optional().or(z.literal("")),
  status: z.string().default("Open"),
});

/**
 * Update Food Schema
 * Validation schema for updating existing food items (all fields optional)
 */
export const updateFoodSchema = createFoodSchema.partial();

export type Food = z.infer<typeof foodSchema>;
export type CreateFood = z.infer<typeof createFoodSchema>;
export type UpdateFood = z.infer<typeof updateFoodSchema>;
export type Restaurant = z.infer<typeof restaurantSchema>;
