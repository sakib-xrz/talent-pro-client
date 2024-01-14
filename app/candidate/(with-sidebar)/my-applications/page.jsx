"use client";

import { generateQueryString } from "@/common/UtilKit";
import PageTitleWithButton from "@/components/shared/PageTitleWithButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MyApplicationSearchSortFilter from "./components/MyApplicationSearchSortFilter";

export default function MyApplications() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "descending",
    status: searchParams.get("status") || "",
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "10",
  });

  const queryString = generateQueryString(params);

  useEffect(() => {
    router.push(queryString);
  }, [queryString, router]);
  return (
    <div className="space-y-4">
      <PageTitleWithButton title={"My Applications"} />

      <MyApplicationSearchSortFilter params={params} setParams={setParams} />
    </div>
  );
}
