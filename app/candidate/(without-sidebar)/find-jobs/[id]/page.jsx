"use client";

import { useQuery } from "@tanstack/react-query";

import APIKit from "@/common/APIkit";

import AboutCompanyCard from "./components/AboutCompanyCard";
import BannerSection from "./components/BannerSection";
import { Card } from "@/components/ui/card";
import JobCardSection from "./components/JobCardSection";
import JobInfoSection from "./components/JobInfoSection";

export default function CandidateJobDetails({ params: { id } }) {
  const { data: job, isLoading } = useQuery({
    queryKey: [`/find-jobs/${id}`],
    queryFn: () => APIKit.job.getSingleJob(id).then((data) => data.data),
    enabled: !!id,
  });

  if (isLoading) {
    return "Loading...";
  }

  const { job_description } = job;

  return (
    <div>
      <div className="bg-[url('/images/job-details-banner.png')] bg-cover">
        <BannerSection job={job} id={id} />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-8/12">
            <Card className="space-y-5">
              <JobCardSection job={job} />

              <hr />

              <JobInfoSection job={job} />

              <hr />

              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: job_description }}
              />
            </Card>
          </div>
          <div className="w-full space-y-2 lg:w-4/12">
            <AboutCompanyCard job={job} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
