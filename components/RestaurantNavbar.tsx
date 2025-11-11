"use client";

import React, { useState } from "react";
import { Logo } from "@/assets";
import Image from "next/image";
import Button from "@/components/ui/button"; 
import FoodFormModal, { FoodFormValues } from "@/components/ui/food-form-modal";
import { useCreateFoodMutation } from "@/lib";
import { useToast } from "@/lib/context/ToastContext";

/**
 * Restaurant Navbar Component
 * Provides navigation header with logo and add food functionality
 */
export default function RestaurantNavbar() {
  const [openCreate, setOpenCreate] = useState(false);
  const [createFood, { isLoading: isCreating }] = useCreateFoodMutation();
  const { showSuccess, showError } = useToast();

  const handleCreateFood = async (values: Required<FoodFormValues>) => {
    try {
      const payload = {
        name: values.name,
        image: values.imageUrl,
        Price: values.price,
        rating: Number(values.rating),
        restaurantName: values.restaurantName,
        logo: values.logo,
        status: values.status,
      };
      await createFood(payload).unwrap();
      showSuccess("Food item created successfully!");
      setOpenCreate(false);
    } catch (error) {
      showError("Failed to create food item");
    }
  };

  return (
    <>
      <nav className="flex items-center justify-center p-4 bg-white">
        <div className="md:max-w-7xl flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <Image src={Logo} alt="Logo" className="w-7" />
            <div className="text-[20px] font-bold text-secondary">
              Food<span className="text-primary">Wagen</span>
            </div>
          </div>
          <div>
            <Button className="px-5" onClick={() => setOpenCreate(true)}>
              Add Food
            </Button>
          </div>
        </div>
      </nav>

      <FoodFormModal
        open={openCreate}
        mode="create"
        onClose={() => setOpenCreate(false)}
        submitting={isCreating}
        onSubmit={handleCreateFood}
      />
    </>
  );
}
