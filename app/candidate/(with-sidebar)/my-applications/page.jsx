"use client";

import { generateQueryString } from "@/common/UtilKit";
import PageTitleWithButton from "@/components/shared/PageTitleWithButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MyApplicationCard from "./components/MyApplicationCard";
import MyApplicationCardSkeleton from "./components/MyApplicationCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/APIkit";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EpmtyState";
import ApplicationSearchSortFilter from "@/components/application/ApplicationSearchSortFilter";

export default function MyApplications() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "descending",
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "10",
  });

  const queryString = generateQueryString(params);

  useEffect(() => {
    router.push(queryString);
  }, [queryString, router]);

  const { data: applications, isLoading } = useQuery({
    queryKey: [`me/job/applied-job${queryString}`],
    queryFn: () =>
      APIKit.me.job.application
        .getAppliedJobs(queryString)
        .then((data) => data),
  });

  const getDynamicEmptyStateTitle = () => {
    let title = "";
    if (params.search.length > 0) {
      return (title = `Couldn't find any application which job title is "${params.search}"`);
    }
    return "Couldn't find any applications";
  };

  return (
    <div className="space-y-4">
      <PageTitleWithButton title={"My Applications"} />

      <ApplicationSearchSortFilter params={params} setParams={setParams} />

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(Number(params.limit)).keys()].map((item) => (
              <MyApplicationCardSkeleton key={item} />
            ))}
          </div>
        </div>
      ) : applications?.meta?.total ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {applications.data.map((application) => (
              <MyApplicationCard
                key={application?._id}
                application={application}
              />
            ))}
          </div>
          <Pagination
            params={params}
            setParams={setParams}
            dataLength={applications.meta.total}
          />
        </div>
      ) : (
        <EmptyState
          src="/empty/application-empty.svg"
          title={getDynamicEmptyStateTitle()}
          helperText="Once we found, you will see a list of applications."
        />
      )}
    </div>
  );
}
