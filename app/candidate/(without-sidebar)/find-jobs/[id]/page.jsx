"use client";

import { useQuery } from "@tanstack/react-query";

import APIKit from "@/common/APIkit";
import { useStore } from "@/context/StoreProvider";

import "react-quill/dist/quill.snow.css";

import AboutCompanyCard from "./components/AboutCompanyCard";
import BannerSection from "./components/BannerSection";
import { Card } from "@/components/ui/card";
import JobCardSection from "./components/JobCardSection";
import JobDetailsSkeletonPage from "./components/skeleton/JobDetailsSkeletonPage";
import JobInfoSection from "./components/JobInfoSection";

export default function CandidateJobDetails({ params: { id } }) {
  const { user } = useStore();

  const { data: job, isLoading } = useQuery({
    queryKey: [`me/job/${id}`],
    queryFn: () => APIKit.me.job.getSingleJob(id).then((data) => data.data),
    enabled: !!id,
  });

  const {
    data: saveJobsList,
    isLoading: saveJobsListLoading,
    refetch: saveJobsListRefetch,
  } = useQuery({
    queryKey: ["/me/job/saved/list"],
    queryFn: () =>
      APIKit.me.job.saved.getSaveJobsList().then((data) => data.data),
  });

  if (isLoading || saveJobsListLoading) {
    return <JobDetailsSkeletonPage />;
  }

  const isJobSaved = saveJobsList?.some((id) => id === job._id);
  const isAppliedJob = job.applied_by?.some((id) => id === user._id);

  const { job_description } = job;

  return (
    <div>
      <div className="bg-[url('/images/job-details-banner.png')] bg-cover">
        <BannerSection
          job={job}
          id={id}
          isJobSaved={isJobSaved}
          isAppliedJob={isAppliedJob}
          saveJobsListRefetch={saveJobsListRefetch}
        />
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
                className="ql-editor prose !p-0"
                dangerouslySetInnerHTML={{ __html: job_description }}
              />
            </Card>
          </div>
          <div className="w-full space-y-2 lg:w-4/12">
            <AboutCompanyCard job={job} id={id} isAppliedJob={isAppliedJob} />
          </div>
        </div>
      </div>
    </div>
  );
}
