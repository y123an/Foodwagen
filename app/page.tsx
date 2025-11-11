"use client";

import { useState } from "react";
import RestaurantHero from "@/components/RestaurantHero";
import RestaurantFeature from "@/components/RestaurantFeature";

function page() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <RestaurantHero onSearch={handleSearch} onClearSearch={handleClearSearch} />
      <RestaurantFeature searchQuery={searchQuery} onClearSearch={handleClearSearch} />
    </>
  );
}

export default page;
