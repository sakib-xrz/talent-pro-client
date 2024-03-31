"use client";

import APIKit from "@/common/APIkit";
import Container from "@/components/shared/Container";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import JobCardSection from "./components/JobCardSection";
import JobInfoSection from "./components/JobInfoSection";
import "react-quill/dist/quill.snow.css";
import { useQuery } from "@tanstack/react-query";
import { EyeIcon, UsersIcon } from "@heroicons/react/24/outline";
import Action from "./components/Action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Breadcrumb from "@/components/shared/Breadcrumb";
import RecruiterJobDetailsSkeletonPage from "./components/skeleton/RecruiterJobDetailsSkeletonPage";

const contents = [
  { href: "/recruiter/jobs", label: "Jobs" },
  { href: null, label: "Job Details" },
];

export default function RecruiterJobDetailsPage({ params: { id } }) {
  const { data: job, isLoading } = useQuery({
    queryKey: [`we/job/${id}`],
    queryFn: () => APIKit.we.job.getSingleJob(id).then((data) => data.data),
    enabled: !!id,
  });

  return (
    <Container>
      <Breadcrumb contents={contents} />

      {isLoading ? (
        <RecruiterJobDetailsSkeletonPage />
      ) : (
        <Card className="space-y-5">
          <CardTitle className="flex flex-col gap-2 xs:flex-row xs:items-center xs:justify-between">
            Job Analytics
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center gap-2 text-primary">
                        <EyeIcon className="h-5 w-5" />
                        <CardDescription>
                          {job?.total_views || 0}{" "}
                          {job?.total_views > 1 ? "Views" : "View"}
                        </CardDescription>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="hidden lg:block">
                        {job?.total_views || 0} candidate viewed this job
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center gap-2 text-primary">
                        <UsersIcon className="h-5 w-5" />
                        <CardDescription>
                          {job?.total_applications || 0} Applied
                        </CardDescription>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="hidden lg:block">
                        {job?.total_applications || 0} candidate applied this
                        job
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Action job={job} />
            </div>
          </CardTitle>

          <hr />

          <JobCardSection job={job} />

          <hr />
          <JobInfoSection job={job} />
          <hr />

          <div
            className="ql-editor prose !p-0"
            dangerouslySetInnerHTML={{ __html: job.job_description }}
          />
        </Card>
      )}
    </Container>
  );
}
