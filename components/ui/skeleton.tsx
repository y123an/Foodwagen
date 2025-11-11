import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton Component
 * Displays a loading placeholder with shimmer animation
 */
export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 relative overflow-hidden",
        "before:absolute before:inset-0",
        "before:-translate-x-full before:animate-shimmer",
        "before:bg-linear-to-r before:from-transparent before:via-white/60 before:to-transparent",
        className
      )}
    />
  );
}
