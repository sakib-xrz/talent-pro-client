"use client";

import { generateQueryString } from "@/common/UtilKit";
import RecruiterJobCard from "@/components/recruiter/job/RecruiterJobCard";
import Container from "@/components/shared/Container";
import { useState } from "react";
import RecruiterJobSearchSortFilter from "./components/RecruiterJobSearchSortFilter";

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
  console.log(queryString);

  return (
    <Container>
      <div className="space-y-4">
        <RecruiterJobSearchSortFilter params={params} setParams={setParams} />
        <div className="grid grid-cols-2 gap-4">
          <RecruiterJobCard />
          <RecruiterJobCard />
        </div>
      </div>
    </Container>
  );
}
