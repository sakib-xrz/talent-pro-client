import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CandidateJobCardSkeleton() {
  return (
    <Card className={"h-[16.6rem] space-y-3 lg:h-[14rem]"}>
      <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
        <Skeleton className="h-4 w-32" />

        <Skeleton className="h-5 w-36" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-md p-2" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-32 lg:w-40" />
            <Skeleton className="h-4 w-40 md:w-52 lg:w-72" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full lg:w-20" />
          <Skeleton className="h-5 w-16 rounded-full lg:w-20" />
          <Skeleton className="h-5 w-16 rounded-full lg:w-20" />
        </div>

        <div className="flex flex-col items-center gap-3 lg:flex-row ">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </Card>
  );
}
