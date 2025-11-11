"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { IoClose, IoCheckmarkCircle, IoAlertCircle, IoWarning, IoInformationCircle } from "react-icons/io5";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const toastStyles: Record<ToastType, { bg: string; border: string; icon: typeof IoCheckmarkCircle }> = {
  success: {
    bg: "bg-success-light border-success-dark",
    border: "border-success-dark",
    icon: IoCheckmarkCircle,
  },
  error: {
    bg: "bg-error-light border-error-dark",
    border: "border-error-dark",
    icon: IoAlertCircle,
  },
  warning: {
    bg: "bg-warning-light border-warning-dark",
    border: "border-warning-dark",
    icon: IoWarning,
  },
  info: {
    bg: "bg-info-light border-info-dark",
    border: "border-info-dark",
    icon: IoInformationCircle,
  },
};

/**
 * Toast notification component
 * Displays temporary notification messages with auto-dismiss functionality
 */
export default function Toast({ id, type, message, duration = 5000, onClose }: ToastProps) {
  const { bg, border, icon: Icon } = toastStyles[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "flex items-start gap-3 min-w-[300px] max-w-md p-4 rounded-lg border-l-4 shadow-lg backdrop-blur-sm animate-in slide-in-from-right-full",
        bg,
        border
      )}
    >
      <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", `text-${type}-dark`)} />
      <p className="flex-1 text-sm font-medium text-gray-900">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="shrink-0 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
        aria-label="Close notification"
      >
        <IoClose className="w-5 h-5" />
      </button>
    </div>
  );
}
