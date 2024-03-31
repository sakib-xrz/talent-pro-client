import React from "react";
import JobCardSectionSkeleton from "./JobCardSectionSkeleton";
import JobInfoSectionSkeleton from "./JobInfoSectionSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Container from "@/components/shared/Container";

const RecruiterJobDetailsSkeletonPage = () => {
  return (
    <Container>
      <div>
        {/* <div className="flex  xs:flex-row xs:items-center xs:justify-between"> */}
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
        {/* </div> */}
      </div>
    </Container>
  );
};

export default RecruiterJobDetailsSkeletonPage;
