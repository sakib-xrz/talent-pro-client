"use client";

import { generateQueryString } from "@/common/UtilKit";
import RecruiterJobCard from "@/app/recruiter/jobs/components/RecruiterJobCard";
import Container from "@/components/shared/Container";
import { useState } from "react";
import RecruiterJobSearchSortFilter from "./components/RecruiterJobSearchSortFilter";

export default function AllJobs() {
  const [params, setParams] = useState({
    search: "",
    job_type: "",
    location_type: "",
    experience_level: "",
    sort_by: "createdAt",
    sort_order: "descending",
    page: "",
    limit: "",
  });

  const queryString = generateQueryString(params);
  console.log(queryString);

  return (
    <Container>
      <div className="space-y-4">
        <RecruiterJobSearchSortFilter params={params} setParams={setParams} />
        <div className="grid gap-4 md:grid-cols-2">
          <RecruiterJobCard />
          <RecruiterJobCard />
        </div>
      </div>
    </Container>
  );
}
