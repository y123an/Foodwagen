/**
 * UI Types
 * Centralized type definitions for UI components
 */

import React from "react";
import type { FoodFormValues } from "./food.types";

/**
 * Modal Size Type
 * Available sizes for modal components
 */
export type ModalSize = "sm" | "md" | "lg" | "xl";

/**
 * Modal Props Type
 * Props for Modal component
 */
export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  hideClose?: boolean;
  className?: string;
  initialFocusRef?: React.RefObject<HTMLElement> | null;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
};

/**
 * Button Size Type
 * Available sizes for button components
 */
export type ButtonSize = "sm" | "default" | "lg" | "icon";

/**
 * Food Form Modal Props Type
 * Props for FoodFormModal component
 */
export type FoodFormModalProps = {
  open: boolean;
  mode: "create" | "edit";
  initialData?: FoodFormValues | null;
  onClose: () => void;
  onSubmit: (values: Required<FoodFormValues>) => Promise<void> | void;
  submitting?: boolean;
};

/**
 * Food Delete Modal Props Type
 * Props for FoodDeleteModal component
 */
export type FoodDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  confirming?: boolean;
  foodName?: string;
};

/**
 * Input Props Type
 * Props for Input component
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
