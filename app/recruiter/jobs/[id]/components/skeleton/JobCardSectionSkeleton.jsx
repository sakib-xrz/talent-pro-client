import { Skeleton } from "@/components/ui/skeleton";

export default function JobCardSectionSkeleton() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 xs:flex-row xs:items-center xs:justify-between">
        <Skeleton className="h-6 w-36" />
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 lg:gap-6">
            <Skeleton className="h-6 w-16 xs:w-20 md:w-32" />
            <Skeleton className="h-6 w-16 xs:w-20 md:w-32" />
          </div>
          <Skeleton className="h-6 w-6" />
        </div>
      </div>

      <hr />

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-3 w-32" />
          <div className="hidden items-center gap-3 sm:flex">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <Skeleton className="h-12 w-12 rounded-md border" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-40 sm:w-52" />
            <div className="flex w-full items-center gap-0.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-3 w-24 xs:w-40 sm:w-64" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 xs:flex-row xs:items-center sm:hidden">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
