import * as React from "react";
import { cn } from "@/lib/utils";
import type { InputProps } from "@/lib/types";

const baseClasses =
  "flex h-9 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF312F] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(baseClasses, className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
