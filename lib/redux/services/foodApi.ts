import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { foodSchema } from "@/lib/validations/food.schema";
import type { Food, CreateFood, UpdateFood } from "@/lib/types";

const API_BASE_URL = "https://6852821e0594059b23cdd834.mockapi.io";

/**
 * Food API Service
 * Provides RTK Query endpoints for CRUD operations on food items
 */
export const foodApi = createApi({
  reducerPath: "foodApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Food"],
  endpoints: (builder) => ({
    getFoods: builder.query<Food[], void>({
      query: () => "/Food",
      transformResponse: (response: unknown[]) => {
        return response.map((item) => {
          try {
            return foodSchema.parse(item);
          } catch (error) {
            console.warn("Invalid food item:", item, error);
            return item as Food;
          }
        });
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Food" as const, id })),
              { type: "Food", id: "LIST" },
            ]
          : [{ type: "Food", id: "LIST" }],
    }),

    getFoodById: builder.query<Food, string>({
      query: (id) => `/Food/${id}`,
      transformResponse: (response: unknown) => {
        try {
          return foodSchema.parse(response);
        } catch (error) {
          console.warn("Invalid food item:", response, error);
          return response as Food;
        }
      },
      providesTags: (result, error, id) => [{ type: "Food", id }],
    }),

    createFood: builder.mutation<Food, CreateFood>({
      query: (newFood) => ({
        url: "/Food",
        method: "POST",
        body: newFood,
      }),
      invalidatesTags: [{ type: "Food", id: "LIST" }],
    }),

    updateFood: builder.mutation<Food, { id: string; data: UpdateFood }>({
      query: ({ id, data }) => ({
        url: `/Food/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Food", id },
        { type: "Food", id: "LIST" },
      ],
    }),

    deleteFood: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/Food/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Food", id },
        { type: "Food", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useGetFoodByIdQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} = foodApi;
