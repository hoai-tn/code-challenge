import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Skeleton component for loading states
 * Provides a shimmer effect while content is loading
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/50",
        className
      )}
      {...props}
    />
  );
}

/**
 * Currency amount skeleton - matches the styling of InputCurrency
 */
function CurrencyAmountSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      className={cn(
        "h-10 w-24 bg-gray-700/30",
        className
      )}
      {...props}
    />
  );
}

/**
 * USD value skeleton - matches the styling of USD value display
 */
function UsdValueSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Skeleton
      className={cn(
        "h-4 w-16 bg-gray-600/30",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton, CurrencyAmountSkeleton, UsdValueSkeleton };
