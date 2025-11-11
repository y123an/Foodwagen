import * as React from "react";
import { cn } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa";
import type { ButtonSize } from "@/lib/types";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  className?: string;
  loading?: boolean;
  loadingText?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 rounded-md gap-1.5 px-3",
  default: "h-9 px-4 py-2",
  lg: "h-10 rounded-md px-6",
  icon: "w-9 h-9 p-0",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const primaryClasses =
  "bg-gradient-to-r from-[#FF9A0E] to-[#FFBA26] text-white shadow-[0_10px_15px_-3px_#FFAE004A,0_4px_6px_-2px_#FFAE0042] hover:opacity-90";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = "default", children, loading, loadingText, disabled, ...props }, ref) => {
    const classes = cn(baseClasses, sizeClasses[size], primaryClasses, className);

    return (
      <button
        ref={ref}
        className={classes}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <FaSpinner className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" aria-hidden="true" />
        )}
        {loading ? loadingText ?? children : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
