"use client";

import React from "react";
import Modal from "./modal";
import Button from "./button";

export type FoodDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  confirming?: boolean;
  foodName?: string;
};

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

  const handleConfirm = async () => {
    try {
      setIsConfirming(true);
      await onConfirm();
    } finally {
      setIsConfirming(false);
    }
  };
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Food"
      size="md"
      footer={
        <>
          <Button onClick={handleConfirm} loading={confirming ?? isConfirming} loadingText="Deleting Food...">
            Yes
          </Button>
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-md border border-primary-light bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-orange-50"
          >
            Cancel
          </button>
        </>
      }
    >
      <p className="text-sm text-gray-600">
        Are you sure you want to delete{foodName ? ` the food "${foodName}"` : " this food"}? Actions cannot be reversed.
      </p>
    </Modal>
  );
}
