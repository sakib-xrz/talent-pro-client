import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ProfileCardSkeleton() {
  return (
    <>
      <div className="flex flex-col items-center gap-4 xs:flex-row">
        <Skeleton className="h-28 w-28 shrink-0 rounded-full border border-border object-cover xs:h-16 xs:w-16" />

        <div className="space-y-2 max-xs:flex max-xs:flex-col max-xs:items-center max-xs:justify-center">
          <Skeleton className="h-6 w-28" /> <Skeleton className="h-5 w-52" />
        </div>
      </div>
      <div>
        <Skeleton className="mt-6 h-6 w-28" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-3 h-4 w-52" />

        <Skeleton className="mt-3 h-10 w-full xs:w-40 lg:w-full" />
      </div>
    </>
  );
}
