"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import FoodCard from "./FoodCard";
import { useGetFoodsQuery } from "@/lib/redux/services/foodApi";
import { getRestaurantInfo, getFoodInfo } from "@/lib/helpers/foodHelpers";

interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  rating: number;
  brandColor?: string;
  brandBg?: string;
  isOpen?: boolean;
}

/**
 * Restaurant Feature Component
 * Displays featured food items in a grid layout with load more functionality
 */
export default function RestaurantFeature() {
  const [showCount, setShowCount] = useState(8);

  const { data: foods, isLoading, isError } = useGetFoodsQuery();

  const foodItems: FoodItem[] = (foods || []).map((food) => {
    const foodInfo = getFoodInfo(food);
    const restaurant = getRestaurantInfo(food);
    
    return {
      id: food.id || "",
      name: foodInfo.name,
      price: parseFloat(foodInfo.price.replace("$", "")) || 0,
      image: foodInfo.image,
      brand: restaurant.name,
      rating: foodInfo.rating,
      brandColor: "text-white",
      brandBg: "bg-blue-600",
      isOpen: restaurant.status?.toLowerCase().includes("open") || false,
    };
  });

  const displayedFoods = foodItems.slice(0, showCount);

  const handleLoadMore = () => {
    setShowCount((prev) => prev + 4);
  };

  if (isLoading) {
    return (
      <section className="w-full py-16 bg-white">
        <div className="mx-auto w-full md:max-w-7xl px-4 md:px-0">
          <div className="text-center text-gray-600">Loading featured foods...</div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full py-16 bg-white">
        <div className="mx-auto w-full md:max-w-7xl px-4 md:px-0">
          <div className="text-center text-error">Failed to load foods. Please try again.</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full py-16 bg-white"
      aria-labelledby="featured-foods-heading"
    >
      <div className="mx-auto w-full md:max-w-7xl px-4 md:px-0">
        <div className="flex justify-center items-center mb-10">
          <h2
            id="featured-foods-heading"
            className="text-2xl font-extrabold tracking-tight text-gray-800"
          >
            Featured Foods
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {displayedFoods.map((food, index) => (
            <FoodCard key={food.id} food={food} foodData={foods?.[index]} />
          ))}
        </div>

        {showCount < foodItems.length && (
          <div className="mt-12 flex justify-center">
            <Button
              size="lg"
              onClick={handleLoadMore}
              className="px-10 bg-linear-to-r from-primary to-primary-light text-white shadow-lg hover:scale-[1.02]"
              aria-label="Load more featured foods"
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
