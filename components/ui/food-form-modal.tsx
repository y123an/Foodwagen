"use client";

import React, { useMemo, useState, useEffect } from "react";
import Modal from "./modal";
import Input from "./input";
import Button from "./button";
import type { FoodFormModalProps, FoodFormValues, FoodStatus } from "@/lib/types";
import { useToast } from "@/lib/context/ToastContext";

const fieldWrap = "mb-4";
const errorText = "mt-1 text-xs text-error";

/**
 * Food Form Modal Component
 * Provides a form interface for creating or editing food items
 */
export default function FoodFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
  submitting,
}: FoodFormModalProps) {
  const [values, setValues] = useState<FoodFormValues>({
    name: "",
    rating: "",
    imageUrl: "",
    price: "",
    restaurantName: "",
    logo: "",
    status: "Open Now" as FoodStatus,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { showError } = useToast();      
  useEffect(() => {
    if (open) {
      if (initialData) {
        setValues({
          name: initialData.name ?? "",
          rating: initialData.rating ?? "",
          imageUrl: initialData.imageUrl ?? "",
          price: initialData.price ?? "",
          restaurantName: initialData.restaurantName ?? "",
          logo: initialData.logo ?? "",
          status: initialData.status ?? "Open Now",
        });
      } else {
        setValues({
          name: "",
          rating: "",
          imageUrl: "",
          price: "",
          restaurantName: "",
          logo: "",
          status: "Open Now",
        });
      }
      setTouched({});
    }
  }, [open, initialData]);

  const errors = useMemo<Partial<Record<keyof FoodFormValues, string>>>(() => {
    const e: Partial<Record<keyof FoodFormValues, string>> = {};
    if (!values.name?.trim()) e.name = "Food name is required";
    if (!values.restaurantName?.trim()) e.restaurantName = "Restaurant name is required";
    if (values.rating !== "" && values.rating !== undefined) {
      const num = Number(values.rating);
      if (Number.isNaN(num) || num < 1 || num > 5) {
        e.rating = "Rating must be between 1 and 5";
      }
    }
    if (values.price && values.price.trim()) {
      const num = parseFloat(values.price);
      if (Number.isNaN(num) || num < 0) {
        e.price = "Price must be a positive number";
      }
    }
    if (values.imageUrl && values.imageUrl.trim()) {
      const isValid = /^https?:\/\//i.test(values.imageUrl);
      if (!isValid) e.imageUrl = "Image URL must start with http(s)://";
    }
    if (values.logo && values.logo.trim()) {
      const isValid = /^https?:\/\//i.test(values.logo);
      if (!isValid) e.logo = "Logo URL must start with http(s)://";
    }
    return e;
  }, [values.name, values.restaurantName, values.rating, values.price, values.imageUrl, values.logo]);

  const hasError = (k: keyof FoodFormValues) => Boolean(touched[k] && errors[k]);

  const handleChange = <K extends keyof FoodFormValues>(k: K, v: FoodFormValues[K]) =>
    setValues((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const allTouched: Record<string, boolean> = {
      name: true,
      rating: true,
      imageUrl: true,
      price: true,
      restaurantName: true,
      logo: true,
      status: true,
    };
    setTouched(allTouched);
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    const payload: Required<FoodFormValues> = {
      name: values.name.trim(),
      rating: values.rating === "" ? 0 : Number(values.rating),
      imageUrl: values.imageUrl || "",
      price: values.price || "0.00",
      restaurantName: values.restaurantName || "",
      logo: values.logo || "",
      status: (values.status || "Open Now") as FoodStatus,
    };

    try {
      setIsSubmitting(true);
      await onSubmit(payload);
    } catch {
      showError("Failed to submit the form, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const actionText = mode === "edit" ? "Update Meal" : "Add";
  const loadingText = mode === "edit" ? "Updating Meal..." : "Adding Meal...";
  const title = mode === "edit" ? "Edit Meal" : "Add Meal";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="lg"
      footer={
        <>
          <Button data-test-id="food-form-submit-btn" type="submit" form="food-form" loading={submitting ?? isSubmitting} loadingText={loadingText}>
            {actionText}
          </Button>
          <button
            data-test-id="food-form-cancel-btn"
            type="button"
            onClick={onClose}
            className="h-9 rounded-md border border-primary-light bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-orange-50"
          >
            Cancel
          </button>
        </>
      }
    >
      <form id="food-form" onSubmit={handleSubmit} className="mt-2" aria-labelledby="food-form-title">
        <div className={fieldWrap}>
          <Input
            data-test-id="food-form-name-input"
            id="food_name"
            name="food_name"
            placeholder="Enter food name"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => setTouched((s) => ({ ...s, name: true }))}
            aria-invalid={hasError("name") || undefined}
          />
          {hasError("name") && <p className={errorText} id="food_name-error">{errors.name}</p>}
        </div>

        <div className={fieldWrap}>
          <Input
            data-test-id="food-form-rating-input"
            id="food_rating"
            name="food_rating"
            type="number"
            step="0.1"
            placeholder="Food rating (1-5)"
            value={values.rating ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              const n = Number(val);
              handleChange("rating", val === "" || Number.isNaN(n) ? "" : n);
            }}
            aria-invalid={hasError("rating") || undefined}
            aria-describedby={hasError("rating") ? "restaurant_rating-error" : undefined}
          />
          {hasError("rating") && (
            <p className={errorText} id="restaurant_rating-error">{errors.rating}</p>
          )}
        </div>

        <div className={fieldWrap}>
          <Input
            data-test-id="food-form-price-input"
            id="food_price"
            name="food_price"
            type="number"
            step="0.01"
            placeholder="Food price ($) (e.g., 12.99)"
            value={values.price}
            onChange={(e) => handleChange("price", e.target.value)}
            aria-invalid={hasError("price") || undefined}
            aria-describedby={hasError("price") ? "food_price-error" : undefined}
          />
          {hasError("price") && (
            <p className={errorText} id="food_price-error">{errors.price}</p>
          )}
        </div>

        <div className={fieldWrap}>
          <Input
            data-test-id="food-form-image-input"
            id="food_image"
            name="food_image"
            placeholder="Food image URL (https://...)"
            value={values.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            aria-invalid={hasError("imageUrl") || undefined}
            aria-describedby={hasError("imageUrl") ? "restaurant_image-error" : undefined}
          />
          {hasError("imageUrl") && (
            <p className={errorText} id="restaurant_image-error">{errors.imageUrl}</p>
          )}
        </div>

        <div className={fieldWrap}>
          <Input
            data-test-id="food-form-restaurant-input"
            id="restaurant_name"
            name="restaurant_name"
            placeholder="Enter restaurant name"
            value={values.restaurantName}
            onChange={(e) => handleChange("restaurantName", e.target.value)}
            aria-invalid={hasError("restaurantName") || undefined}
            aria-describedby={hasError("restaurantName") ? "restaurant_name-error" : undefined}
          />
          {hasError("restaurantName") && (
            <p className={errorText} id="restaurant_name-error">{errors.restaurantName}</p>
          )}
        </div>

        <div className={fieldWrap}>
          <Input
            data-test-id="food-form-logo-input"
            id="restaurant_logo"
            name="restaurant_logo"
            placeholder="Restaurant logo URL (https://...)"
            value={values.logo}
            onChange={(e) => handleChange("logo", e.target.value)}
          />
        </div>

        <div className={fieldWrap}>
          <select
            data-test-id="food-form-status-select"
            id="restaurant_status"
            name="restaurant_status"
            className="food-input flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-dark focus-visible:ring-offset-2"
            value={values.status || "Open Now"}
            onChange={(e) => handleChange("status", e.target.value as FoodStatus)}
            aria-label="Restaurant status"
          >
            <option value="Open Now">Open Now</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </form>
    </Modal>
  );
}
