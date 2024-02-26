import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function AboutCompanyCardSkeleton() {
  return (
    <Card className="space-y-5 lg:sticky lg:top-24 ">
      <Skeleton className="h-6 w-40"></Skeleton>
      <div className="space-y-4">
        <div className="flex items-center justify-start gap-4">
          <div>
            <GlobeAltIcon className="h-6 w-6 animate-pulse text-gray-300" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-4 w-40 sm:w-60" />
          </div>
        </div>
        <div className="flex items-center justify-start gap-4">
          <div>
            <MapPinIcon className="h-6 w-6 animate-pulse text-gray-300" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-4 w-44 sm:w-60" />
          </div>
        </div>
        <div className="flex items-center justify-start gap-4">
          <div>
            <BriefcaseIcon className="h-6 w-6 animate-pulse text-gray-300" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-4 w-32 sm:w-60" />
          </div>
        </div>
        <div className="flex items-center justify-start gap-4">
          <div>
            <BuildingOffice2Icon className="h-6 w-6 animate-pulse text-gray-300" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="block h-9 w-full" />
      </div>
    </Card>
  );
}
