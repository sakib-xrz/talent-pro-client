"use client";

import { generateQueryString } from "@/common/UtilKit";
import RecruiterJobCard from "@/app/recruiter/jobs/components/RecruiterJobCard";
import Container from "@/components/shared/Container";
import { useEffect, useState } from "react";
import RecruiterJobSearchSortFilter from "./components/RecruiterJobSearchSortFilter";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/APIkit";
import { useRouter, useSearchParams } from "next/navigation";

export default function AllJobs() {
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

  const { data: jobs, isLoading } = useQuery({
    queryKey: [`/jobs/${queryString}`],
    queryFn: () => APIKit.job.getJob(queryString).then(({ data }) => data),
  });

  return (
    <Container>
      <div className="space-y-4">
        <RecruiterJobSearchSortFilter params={params} setParams={setParams} />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {jobs?.map((job) => (
              <RecruiterJobCard key={job?._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
