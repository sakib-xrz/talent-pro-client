"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import APIKit from "@/common/APIkit";
import { generateQueryString } from "@/common/UtilKit";

import CandidateJobSearchSortFilter from "./components/CandidateJobSearchSortFilter";
import Container from "@/components/shared/Container";
import CandidateJobCard from "./components/CandidateJobCard";
import CandidateJobCardSkeleton from "./components/CandidateJobCardSkeleton";
import EmptyState from "@/components/shared/EpmtyState";
import Pagination from "@/components/shared/Pagination";
import PageTitleWithButton from "@/components/shared/PageTitleWithButton";

export default function CandidateJobPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
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
    queryKey: [`/find-jobs/${queryString}`],
    queryFn: () => APIKit.job.getJob(queryString).then((data) => data),
  });

  const getDynamicEmptyStateTitle = () => {
    let title = "";
    if (params.search.length > 0) {
      return (title = `Couldn't find any job named "${params.search}"`);
    }
    return "Couldn't find any jobs";
  };
  return (
    <Container>
      <div className="space-y-4">
        <PageTitleWithButton title={"Find all jobs"} />

        <CandidateJobSearchSortFilter params={params} setParams={setParams} />

        {isLoading ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(2).keys()].map((item) => (
                <CandidateJobCardSkeleton key={item} />
              ))}
            </div>
          </div>
        ) : jobs?.meta?.total ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {jobs?.data?.map(
                (job) =>
                  (job?.status === "PUBLISHED" ||
                    job?.status === "ON_HOLD") && (
                    <CandidateJobCard
                      key={job?._id}
                      job={job}
                      refetch={refetch}
                    />
                  ),
              )}
            </div>

            <Pagination
              params={params}
              setParams={setParams}
              dataLength={jobs?.meta?.total}
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
