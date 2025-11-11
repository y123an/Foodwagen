import Skeleton from "./ui/skeleton";

/**
 * Food Card Skeleton Component
 * Displays a loading skeleton for food cards with shimmer effect
 */
export default function FoodCardSkeleton() {
  return (
    <article className="bg-white flex flex-col gap-3">
      {/* Image skeleton */}
      <Skeleton className="aspect-4/3 w-full rounded-2xl" />
      
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex gap-3 items-center flex-1">
            {/* Logo skeleton */}
            <Skeleton className="w-12 h-12 rounded-md shrink-0" />
            
            <div className="flex-1 space-y-2">
              {/* Title skeleton */}
              <Skeleton className="h-4 w-3/4" />
              {/* Rating skeleton */}
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
          
          {/* Menu button skeleton */}
          <Skeleton className="w-6 h-6 rounded-md" />
        </div>
        
        {/* Status badge skeleton */}
        <div className="mt-auto">
          <Skeleton className="h-7 w-20 rounded-md" />
        </div>
      </div>
    </article>
  );
}
