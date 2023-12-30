"use client";

import { generateQueryString } from "@/common/UtilKit";
import RecruiterJobCard from "@/app/recruiter/jobs/components/RecruiterJobCard";
import Container from "@/components/shared/Container";
import { useState } from "react";
import RecruiterJobSearchSortFilter from "./components/RecruiterJobSearchSortFilter";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/APIkit";

export default function AllJobs() {
  const [params, setParams] = useState({
    search: "",
    job_type: "",
    location_type: "",
    experience_level: "",
    sortBy: "createdAt",
    sortOrder: "descending",
    page: "",
    limit: "",
  });

  const queryString = generateQueryString(params);

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
