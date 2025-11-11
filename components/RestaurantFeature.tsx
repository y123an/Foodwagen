"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import FoodCard from "./FoodCard";
import FoodCardSkeleton from "./FoodCardSkeleton";
import { useGetFoodsQuery, useSearchFoodsQuery } from "@/lib/redux/services/foodApi";
import { getRestaurantInfo, getFoodInfo } from "@/lib/helpers/foodHelpers";
import { IoSearchOutline } from "react-icons/io5";

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

interface RestaurantFeatureProps {
  searchQuery?: string;
  onClearSearch?: () => void;
}

/**
 * Restaurant Feature Component
 * Displays featured food items in a grid layout with load more functionality
 */
export default function RestaurantFeature({ searchQuery, onClearSearch }: RestaurantFeatureProps) {
  const [showCount, setShowCount] = useState(8);

  const { data: allFoods, isLoading: isLoadingAll, isError: isErrorAll } = useGetFoodsQuery(undefined, {
    skip: !!searchQuery,
  });
  
  const { data: searchResults, isLoading: isLoadingSearch, isError: isErrorSearch } = useSearchFoodsQuery(searchQuery || "", {
    skip: !searchQuery,
  });

  const foods = searchQuery ? searchResults : allFoods;
  const isLoading = searchQuery ? isLoadingSearch : isLoadingAll;
  const isError = searchQuery ? isErrorSearch : isErrorAll;

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
      <section id="featured-foods-section" className="w-full py-16 bg-white">
        <div className="mx-auto w-full md:max-w-7xl px-4 md:px-0">
          <div className="flex justify-center items-center mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
              {searchQuery ? `Searching for "${searchQuery}"...` : "Featured Foods"}
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <FoodCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError && !searchQuery) {
    return (
      <section id="featured-foods-section" className="w-full py-16 bg-white">
        <div className="mx-auto w-full md:max-w-7xl px-4 md:px-0">
          <div className="text-center text-error">Failed to load foods. Please try again.</div>
        </div>
      </section>
    );
  }

  // Empty state when no foods at all (not search related)
  if (!searchQuery && foods && foods.length === 0) {
    return (
      <section id="featured-foods-section" className="w-full py-16 bg-white">
        <div className="mx-auto w-full md:max-w-7xl px-4 md:px-0">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-6 text-8xl">🍽️</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              No Meals Available
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-md">
              There are currently no meals in our menu. Please check back later or contact us for more information.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if ((searchQuery && (!foods || foods.length === 0)) || (isError && searchQuery)) {
    return (
      <section id="featured-foods-section" className="w-full py-16 bg-white">
        <div className="mx-auto w-full md:max-w-7xl px-4 md:px-0">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-8 text-gray-300">
              <IoSearchOutline size={120} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No Food Found
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              We couldn't find any food matching <span className="font-semibold text-primary">"{searchQuery}"</span>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Try searching with a different keyword or browse our featured foods below
            </p>
            <Button
              onClick={() => {
                if (onClearSearch) {
                  onClearSearch();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="bg-linear-to-r from-primary to-primary-light text-white shadow-lg hover:scale-[1.02]"
            >
              Browse All Foods
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="featured-foods-section"
      className="w-full py-16 bg-white"
      aria-labelledby="featured-foods-heading"
    >
      <div className="mx-auto w-full md:max-w-7xl px-4 md:px-0">
        <div className="flex justify-center items-center mb-10">
          <h2
            id="featured-foods-heading"
            className="text-2xl font-extrabold tracking-tight text-gray-800"
          >
            {searchQuery ? `Search Results for "${searchQuery}"` : "Featured Meals"}
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
