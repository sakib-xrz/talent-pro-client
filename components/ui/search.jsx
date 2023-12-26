"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Search = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="text"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      <div>
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-5 w-6 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </div>
  );
});
Search.displayName = "Search";

export { Search };
