"use client";

import React from "react";
import Modal from "./modal";
import Button from "./button";
import type { FoodDeleteModalProps } from "@/lib/types";
import { useToast } from "@/lib/context/ToastContext";

/**
 * Food Delete Modal Component
 * Displays a confirmation dialog before deleting a food item
 */
export default function FoodDeleteModal({
  open,
  onClose,
  onConfirm,
  confirming,
  foodName,
}: FoodDeleteModalProps) {
  const [isConfirming, setIsConfirming] = React.useState(false);
  const { showError } = useToast();
  const handleConfirm = async () => {
    try {
      setIsConfirming(true);
      await onConfirm();
    } catch{
      showError("Failed to delete the meal, please try again.");
    } finally {
      setIsConfirming(false);
    }
  };
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Meal"
      size="md"
      footer={
        <>
          <Button data-test-id="food-delete-confirm-btn" onClick={handleConfirm} loading={confirming ?? isConfirming} loadingText="Deleting Meal...">
            Yes
          </Button>
          <button
            data-test-id="food-delete-cancel-btn"
            type="button"
            onClick={onClose}
            className="h-9 rounded-md border border-primary-light bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-orange-50"
          >
            Cancel
          </button>
        </>
      }
    >
      <p data-test-id="food-delete-message" className="text-sm text-gray-600">
        Are you sure you want to delete{foodName ? ` the meal "${foodName}"` : " this meal"}? Actions cannot be reversed.
      </p>
    </Modal>
  );
}
