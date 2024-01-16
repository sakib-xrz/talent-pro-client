import { Card } from "@/components/ui/card";
import BannerSectionSkeleton from "./BannerSectionSkeleton";
import JobCardSectionSkeleton from "./JobCardSectionSkeleton";

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
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
