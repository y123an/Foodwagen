"use client";

import { memo, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GoKebabHorizontal } from "react-icons/go";
import { FaTag } from "react-icons/fa";
import ActionMenu from "./ui/action-menu";
import FoodFormModal from "./ui/food-form-modal";
import FoodDeleteModal from "./ui/food-delete-modal";
import { useUpdateFoodMutation, useDeleteFoodMutation } from "@/lib/redux/services/foodApi";
import { DefaultRestorantLogo, DefaultFoodImage } from "@/assets";
import { useToast } from "@/lib/context/ToastContext";
import type { FoodCardProps, FoodFormValues } from "@/lib/types";

/**
 * Food Card Component
 * Displays a food item with image, price, rating, and action menu for edit/delete
 */
const FoodCard = memo(function FoodCard({
  food,
  foodData,
}: FoodCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [logoSrc, setLogoSrc] = useState(foodData?.logo || DefaultRestorantLogo);
  const [imageSrc, setImageSrc] = useState(food.image || DefaultFoodImage);
  const { showSuccess, showError } = useToast();

  const [updateFood, { isLoading: isUpdating }] = useUpdateFoodMutation();
  const [deleteFood, { isLoading: isDeleting }] = useDeleteFoodMutation();

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
    <>
      <article
      className="group relative bg-white flex flex-col gap-2 md:gap-3"
      aria-label={food.name}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl md:rounded-2xl">
        <Image
          src={imageSrc}
          alt={food.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          width={350}
          height={262}
          onError={() => setImageSrc(DefaultFoodImage)}
        />
        <span className="absolute top-2 left-2 md:top-3 md:left-3 rounded-sm flex gap-1 items-center bg-linear-to-r from-primary to-primary-light px-2 py-1 text-xs font-semibold text-white shadow-md">
          <FaTag className="text-white w-2.5 h-2.5 md:w-3 md:h-3" />${food.price.toFixed(2)}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 md:gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex gap-2 md:gap-3 items-center">
            <span>
              <Image
                src={logoSrc}
                alt={food.brand}
                width={64}
                height={64}
                onError={() => setLogoSrc(DefaultRestorantLogo)}
                className="object-cover w-10 h-10 md:w-12 md:h-12 rounded-md"
              />
            </span>
            <div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-800 leading-snug">
                {food.name}
              </h3>
              <div className="flex items-center gap-1" aria-label="Rating">
                <span className="ml-1 text-xs font-medium text-gray-600">
                  {food.rating.toFixed(1)}
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
              <GoKebabHorizontal className="rotate-90 text-black w-4 h-4 md:w-5 md:h-5" />
            </button>

            {menuOpen && (
              <ActionMenu
                ref={menuRef}
                onEdit={() => {
                  setMenuOpen(false);
                  setOpenEdit(true);
                }}
                onDelete={() => {
                  setMenuOpen(false);
                  setOpenDelete(true);
                }}
              />
            )}
          </div>
        </div>
        <div className="mt-auto flex">
          <span
            aria-label={`Status: ${food.isOpen ? "Open" : "Closed"}`}
            className={cn(
              "inline-block rounded-md px-2 py-1 text-center text-xs font-semibold tracking-wide",
              food.isOpen
                ? "bg-success-light text-success-dark border border-success"
                : "bg-error-light text-error-dark border border-error"
            )}
          >
            {food.isOpen ? "Open" : "Closed"}
          </span>
        </div>
      </div>
    </article>

    <FoodFormModal
      open={openEdit}
      mode="edit"
      initialData={{
        name: food.name,
        rating: food.rating,
        imageUrl: food.image,
        price: food.price.toString(),
        restaurantName: food.brand,
        logo: foodData?.logo || foodData?.restaurant_logo || "",
        status: (food.isOpen ? "Open Now" : "Closed") as "Open Now" | "Closed",
      }}
      onClose={() => setOpenEdit(false)}
      submitting={isUpdating}
      onSubmit={async (values: Required<FoodFormValues>) => {
        try {
          if (foodData?.id) {
            await updateFood({
              id: foodData.id,
              data: {
                name: values.name,
                image: values.imageUrl,
                Price: values.price,
                rating: Number(values.rating),
                restaurantName: values.restaurantName,
                logo: values.logo,
                status: values.status,
              },
            }).unwrap();
            showSuccess("Food item updated successfully!");
          }
          setOpenEdit(false);
        } catch (error) {
          showError("Failed to update food item");
        }
      }}
    />

    <FoodDeleteModal
      open={openDelete}
      onClose={() => setOpenDelete(false)}
      foodName={food.name}
      confirming={isDeleting}
      onConfirm={async () => {
        try {
          if (foodData?.id) {
            await deleteFood(foodData.id).unwrap();
            showSuccess("Food item deleted successfully!");
          }
          setOpenDelete(false);
        } catch (error) {
          showError("Failed to delete food item");
        }
      }}
    />
    </>
  );
});

export default FoodCard;
