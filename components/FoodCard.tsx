import { memo } from "react";
import Button from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GoKebabHorizontal } from "react-icons/go";
import { FaTag } from "react-icons/fa";

interface Meal {
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

const FoodCard = memo(function FoodCard({ meal }: { meal: Meal }) {
  return (
    <article
      className="group relative bg-white overflow-hidden flex flex-col gap-3"
      aria-label={meal.name}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
        <Image
          src={meal.image}
          alt={meal.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          width={350}
          height={262}
        />
        <span className="absolute top-3 left-3 rounded-sm flex gap-1 items-center bg-linear-to-r from-[#FF9A0E] to-[#FFBA26] px-2 py-1 text-xs font-semibold text-white shadow-md">
            <FaTag className="text-white" />
          ${meal.price.toFixed(2)}
        </span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex gap-3 items-center">
            <span
              className={cn(
                "inline-block w-fit rounded-sm px-2 py-1 text-[10px] font-semibold tracking-wide shadow",
                meal.brandBg,
                meal.brandColor
              )}
            >
              {meal.brand}
            </span>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 leading-snug">
                {meal.name}
              </h3>
              <div className="flex items-center gap-1" aria-label="Rating">
                <span className="ml-1 text-xs font-medium text-gray-600">
                  {meal.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
          <button>
            <GoKebabHorizontal className="rotate-90 text-black" />
          </button>
        </div>
        <div className="mt-auto flex">
          {/* <Button
            size="sm"
            className="w-full bg-linear-to-r from-[#FF9A0E] to-[#FFBA26] text-white hover:opacity-90"
          >
            Order Now
          </Button> */}
          <span
            aria-label={`Status: ${meal.isOpen ? "Open" : "Closed"}`}
            className={cn(
              "inline-block rounded-md px-2 py-1 text-center text-xs font-semibold tracking-wide",
              meal.isOpen
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            )}
          >
            {meal.isOpen ? "Open" : "Closed"}
          </span>
        </div>
      </div>
    </article>
  );
});

export default FoodCard;
