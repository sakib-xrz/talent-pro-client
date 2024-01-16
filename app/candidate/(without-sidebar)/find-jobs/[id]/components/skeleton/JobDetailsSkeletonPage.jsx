import { Card } from "@/components/ui/card";
import BannerSectionSkeleton from "./BannerSectionSkeleton";
import JobCardSectionSkeleton from "./JobCardSectionSkeleton";
import JobInfoSectionSkeleton from "./JobInfoSectionSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobDetailsSkeletonPage() {
  return (
    <div>
      <div className="animate-pulse bg-gray-200 lg:h-[24rem]">
        <BannerSectionSkeleton />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-8/12">
            <Card className="space-y-5">
              <JobCardSectionSkeleton />
              <hr />
              <JobInfoSectionSkeleton />
              <hr />
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <div className="space-y-2">
                  <Skeleton className="h-2 w-full" />
                  <Skeleton className="h-2 w-full" />
                  <Skeleton className="h-2 w-full" />
                  <Skeleton className="h-2 w-full" />
                  <Skeleton className="h-2 w-7/12" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
