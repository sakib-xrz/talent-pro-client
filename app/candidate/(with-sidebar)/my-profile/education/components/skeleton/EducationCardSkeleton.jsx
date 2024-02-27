import { Skeleton } from "@/components/ui/skeleton";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function EducationCardSkeleton() {
  return (
    <div className="flex flex-col items-start justify-between gap-2 rounded-lg border p-3 sm:flex-row">
      <div className="flex gap-4">
        <div className="flex items-start justify-center">
          <AcademicCapIcon className="h-10 w-10 rounded-md bg-muted p-2 text-primary/40" />
        </div>

        <div className="space-y-2">
          <Skeleton className={"h-5 w-40"} />
          <Skeleton className={"h-4 w-72"} />
          <Skeleton className={"h-3.5 w-52"} />
          <Skeleton className={"h-3.5 w-44"} />
        </div>
      </div>
      <div className="flex w-full gap-2 sm:w-auto sm:flex-col">
        <Skeleton className="flex h-10 w-1/2 items-center gap-2 sm:w-28 " />

        <Skeleton className="flex h-10 w-1/2 items-center gap-2 sm:w-28 " />
      </div>
    </div>
  );
}
