"use client";

import { generateQueryString } from "@/common/UtilKit";
import Container from "@/components/shared/Container";
import { Search } from "@/components/ui/search";
import { useState } from "react";

export default function AllJobs() {
  const [params, setParams] = useState({
    search: "",
    job_type: "",
    location_type: "",
    experience_level: "",
    sortBy: "",
    sortOrder: "",
    page: "",
    limit: "",
  });

  const queryString = generateQueryString(params);
  console.log(queryString);

  return (
    <Container>
      <Search
        value={params.search}
        onChange={(e) =>
          setParams((prevParams) => ({
            ...prevParams,
            search: e?.target?.value,
          }))
        }
        onReset={() => {
          setParams((prevParams) => ({
            ...prevParams,
            search: "",
          }));
        }}
      />
    </Container>
  );
}
