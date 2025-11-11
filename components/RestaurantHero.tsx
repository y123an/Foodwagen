"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    <motion.section
      className="bg-primary py-8 md:py-16 px-4 md:px-8 lg:px-16 will-change-transform"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-7xl mx-auto md:flex md:items-center md:gap-12 lg:gap-36"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } }
        }}
      >
        <motion.div
          className="flex-1 text-white"
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-7xl font-bold"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Are you starving?
          </motion.h1>
          <motion.p
            className="text-base md:text-lg mt-2 font-light text-white/90"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Within a few clicks, find meals that are accessible near you
          </motion.p>
          <motion.div
            className="mt-6 bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex space-x-2 rounded-full p-1 mb-4">
              {(["delivery", "pickup"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setMode(item as "delivery" | "pickup")}
                  className={cn(
                    "px-4 md:px-6 py-1 rounded-md text-xs md:text-sm font-bold",
                    mode === item
                      ? "text-secondary bg-secondary/10"
                      : "text-gray-600"
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <Image
                      src={item === "delivery" ? DeliveryIcon : PickupIcon}
                      alt={item === "delivery" ? "Delivery" : "Pickup"}
                      className="w-3 h-3 md:w-4 md:h-4"
                    />
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-4 h-4 md:w-5 md:h-5" />
                <Input
                  placeholder="What do you like to eat today?"
                  className="border-none bg-gray-100 pl-9 md:pl-10 py-3 md:py-5 pr-9 md:pr-10 text-sm md:text-base"
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
                className="bg-secondary hover:bg-secondary/80 text-white p-3 md:p-5 text-sm md:text-base"
                onClick={handleSearch}
              >
                <IoSearch className="w-4 h-4" />
                <span className="hidden sm:inline">Find Meal</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="hidden md:block shrink-0 relative top-16"
          variants={{ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Image
            src={HeroImage}
            alt="Food hero image"
            className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] food-hero-image-shadow"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
