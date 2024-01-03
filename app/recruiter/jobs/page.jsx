"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import APIKit from "@/common/APIkit";
import { generateQueryString } from "@/common/UtilKit";

import Container from "@/components/shared/Container";
import EmptyState from "@/components/shared/EpmtyState";
import Pagination from "@/components/shared/Pagination";
import RecruiterJobCard from "@/app/recruiter/jobs/components/RecruiterJobCard";
import RecruiterJobCardSkeleton from "./components/RecruiterJobCardSkeleton";
import RecruiterJobSearchSortFilter from "./components/RecruiterJobSearchSortFilter";
import PageTitleWithButton from "@/components/shared/PageTitleWithButton";

export default function AllJobs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    job_type: searchParams.get("job_type") || "",
    location_type: searchParams.get("location_type") || "",
    experience_level: searchParams.get("experience_level") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "descending",
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "2",
  });

  const queryString = generateQueryString(params);

  useEffect(() => {
    router.push(queryString);
  }, [queryString, router]);

  const {
    data: jobs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/jobs/${queryString}`],
    queryFn: () => APIKit.job.getJob(queryString).then((data) => data),
  });

  const getDynamicEmptyStateTitle = () => {
    let title = "";
    if (params.search.length > 0) {
      return (title = `We could not find any job named "${params.search}"`);
    }
    return "We could not find any jobs";
  };

  return (
    <Container>
      <div className="space-y-4">
        <PageTitleWithButton
          title={"Job Listings"}
          buttonText={"Post New Job"}
          href="/recruiter/jobs/post-job"
        />

        <RecruiterJobSearchSortFilter params={params} setParams={setParams} />

        {isLoading ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(2).keys()].map((item) => (
                <RecruiterJobCardSkeleton key={item} />
              ))}
            </div>
          </div>
        ) : jobs?.meta?.total ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {jobs.data.map((job) => (
                <RecruiterJobCard key={job?._id} job={job} refetch={refetch} />
              ))}
            </div>
            <Pagination
              params={params}
              setParams={setParams}
              dataLength={jobs.meta.total}
            />
          </div>
        ) : (
          <EmptyState
            src="/empty/job-empty.svg"
            title={getDynamicEmptyStateTitle()}
            helperText="Once we found, you will see a list of jobs."
          />
        )}
      </div>
    </Container>
  );
}
