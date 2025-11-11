"use client";

import { useState, useCallback, memo } from "react";
import RestaurantHero from "@/components/RestaurantHero";
import RestaurantFeature from "@/components/RestaurantFeature";

const HomePage = memo(function HomePage() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  return (
    <>
      <RestaurantHero onSearch={handleSearch} onClearSearch={handleClearSearch} />
      <RestaurantFeature searchQuery={searchQuery} onClearSearch={handleClearSearch} />
    </>
  );
});

export default HomePage;
