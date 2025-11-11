"use client";

import { memo, useEffect, useRef, useState } from "react";
import Button from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GoKebabHorizontal } from "react-icons/go";
import { FaTag } from "react-icons/fa";
import ActionMenu from "./ui/action-menu";

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

type FoodCardProps = {
  meal: Meal;
  onEdit?: (meal: Meal) => void;
  onDelete?: (meal: Meal) => void;
};

const FoodCard = memo(function FoodCard({
  meal,
  onEdit,
  onDelete,
}: FoodCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        btnRef.current &&
        !btnRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [menuOpen]);

  return (
    <article
      className="group relative bg-white flex flex-col gap-3"
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
          <FaTag className="text-white" />${meal.price.toFixed(2)}
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
          <div className="relative">
            <button
              ref={btnRef}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            >
              <GoKebabHorizontal className="rotate-90 text-black" />
            </button>

            {menuOpen && (
              <ActionMenu
                ref={menuRef}
                onEdit={() => {
                  setMenuOpen(false);
                  if (onEdit) onEdit(meal);
                  else console.log("Edit", meal);
                }}
                onDelete={() => {
                  setMenuOpen(false);
                  if (onDelete) onDelete(meal);
                  else console.log("Delete", meal);
                }}
              />
            )}
          </div>
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
