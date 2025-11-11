/**
 * Toast Types
 * Centralized type definitions for toast notification system
 */

/**
 * Toast Type
 * Available types of toast notifications
 */
export type ToastType = "success" | "error" | "warning" | "info";

/**
 * Toast Props Type
 * Props for Toast component
 */
export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

/**
 * Toast Object Type
 * Internal toast data structure
 */
export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

/**
 * Toast Container Props Type
 * Props for ToastContainer component
 */
export interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

/**
 * Toast Context Value Type
 * Context value provided by ToastProvider
 */
export interface ToastContextValue {
  showToast: (type: ToastType, message: string, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}
