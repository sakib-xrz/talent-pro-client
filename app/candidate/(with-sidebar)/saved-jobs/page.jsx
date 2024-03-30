"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import APIKit from "@/common/APIkit";
import { generateQueryString } from "@/common/UtilKit";
import PageTitleWithButton from "@/components/shared/PageTitleWithButton";
import CandidateJobCardSkeleton from "../../(without-sidebar)/find-jobs/components/CandidateJobCardSkeleton";
import CandidateJobCard from "../../(without-sidebar)/find-jobs/components/CandidateJobCard";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EpmtyState";
import SavedJobSearchSort from "./components/SavedJobSearchSort";
import Container from "@/components/shared/Container";

export default function SavedJobs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "descending",
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "10",
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
    queryKey: [`me/job/saved?${queryString}`],
    queryFn: () =>
      APIKit.me.job.saved.getSaveJobs(queryString).then((data) => data),
    keepPreviousData: true,
  });

  const {
    data: saveJobsList,
    isLoading: saveJobsListLoading,
    refetch: saveJobsListRefetch,
  } = useQuery({
    queryKey: [`/me/job/saved/list`],
    queryFn: () =>
      APIKit.me.job.saved.getSaveJobsList().then((data) => data.data),
  });

  const getDynamicEmptyStateTitle = () => {
    let title = "";
    if (params.search.length > 0) {
      return (title = `Couldn't find any job named "${params.search}"`);
    }
    return "Couldn't find any jobs";
  };
  return (
    <div className="space-y-4">
      <PageTitleWithButton title={"Saved Jobs"} />

      <SavedJobSearchSort params={params} setParams={setParams} />

      {isLoading || saveJobsListLoading ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(Number(params.limit)).keys()].map((item) => (
              <CandidateJobCardSkeleton key={item} />
            ))}
          </div>
        </div>
      ) : jobs?.meta?.total ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {jobs.data.map(({ job }) => (
              <CandidateJobCard
                key={job?._id}
                job={job}
                saveJobsList={saveJobsList}
                saveJobsListRefetch={saveJobsListRefetch}
                refetch={refetch}
              />
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
  );
}
