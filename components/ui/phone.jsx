import * as React from "react";

import { cn } from "@/lib/utils";

const Phone = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        type={"tel"}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70",
          className,
        )}
        ref={ref}
        {...props}
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-sm text-muted-foreground">
        +88
      </span>
    </div>
  );
});
Phone.displayName = "Phone";

export { Phone };
