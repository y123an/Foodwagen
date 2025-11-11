"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Image from "next/image";
import { HeroImage, DeliveryIcon, PickupIcon } from "@/assets";
import { cn } from "@/lib/utils";
import { IoSearch, IoClose } from "react-icons/io5";

interface RestaurantHeroProps {
  onSearch?: (searchTerm: string) => void;
  onClearSearch?: () => void;
}

/**
 * Restaurant Hero Component
 * Displays the main hero section with food search functionality and delivery/pickup mode toggle
 */
export default function RestaurantHero({ onSearch, onClearSearch }: RestaurantHeroProps) {
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() && onSearch) {
      onSearch(searchTerm.trim());
      // Scroll to features section
      const featuresSection = document.getElementById("featured-foods-section");
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    if (onClearSearch) {
      onClearSearch();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="bg-primary py-16 md:flex md:items-end justify-center h-[70vh]">
      <div className="md:flex md:items-center gap-36 w-full md:max-w-7xl">
        <div className="md:w-1/2  text-white">
          <h1 className="text-7xl font-bold">Are you starving?</h1>
          <p className="text-lg mt-2 font-light text-white/90">
            Within a few clicks, find meals that are accessible near you
          </p>
          <div className="mt-6 w-2xl bg-white rounded-2xl shadow-md p-6">
            <div className="flex space-x-2 rounded-full p-1 mb-4">
              {(["delivery", "pickup"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setMode(item as "delivery" | "pickup")}
                  className={cn(
                    "px-6 py-1 rounded-md text-sm font-bold",
                    mode === item
                      ? "text-secondary bg-secondary/10"
                      : "text-gray-600"
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <Image
                      src={item === "delivery" ? DeliveryIcon : PickupIcon}
                      alt={item === "delivery" ? "Delivery" : "Pickup"}
                      className="w-4 h-4"
                    />
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-5 h-5" />
                <Input
                  placeholder="What do you like to eat today?"
                  className="border-none bg-gray-100 pl-10 py-5 pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <IoClose className="w-5 h-5" />
                  </button>
                )}
              </div>
              <Button 
                className="bg-secondary hover:bg-secondary/80 text-white p-5"
                onClick={handleSearch}
              >
                <IoSearch className="w-4 h-4" />
                Find Meal
              </Button>
            </div>
          </div>
        </div>
        <div className="">
          <Image
            src={HeroImage}
            alt="Food hero image"
            className="relative top-16 w-[300px] h-[300px] md:w-[400px] md:h-[400px] food-hero-image-shadow"
          />
        </div>
      </div>
    </section>
  );
}
