// Export types from Zod schemas
export type {
  Food,
  CreateFood,
  UpdateFood,
  Restaurant,
} from "@/lib/validations/food.schema";

// Export Redux hooks
export { useAppDispatch, useAppSelector } from "./redux/hooks";

// Export RTK Query hooks
export {
  useGetFoodsQuery,
  useGetFoodByIdQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} from "./redux/services/foodApi";

// Export schemas for validation
export {
  foodSchema,
  createFoodSchema,
  updateFoodSchema,
  restaurantSchema,
} from "@/lib/validations/food.schema";

// Export helper functions
export {
  getRestaurantInfo,
  getFoodInfo,
  formatPrice,
  isRestaurantOpen,
  getStatusColor,
} from "./helpers/foodHelpers";

// Export custom hooks
export { useFormValidation } from "./hooks/useFormValidation";
