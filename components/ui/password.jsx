"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Password = React.forwardRef(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative">
      <input
        type={`${showPassword ? "text" : "password"}`}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      <div
        onClick={() => setShowPassword(!showPassword)}
        className="cursor-pointer"
      >
        {showPassword ? (
          <EyeSlashIcon className="absolute right-3 top-1/2 h-5 w-6 -translate-y-1/2 transform text-muted-foreground" />
        ) : (
          <EyeIcon className="absolute right-3 top-1/2 h-5 w-6 -translate-y-1/2 transform text-muted-foreground" />
        )}
      </div>
    </div>
  );
});
Password.displayName = "Password";

export { Password };
