"use client";

import APIKit from "@/common/APIkit";
import { useQuery } from "@tanstack/react-query";

export default function ApplicationDetails({ params: { id } }) {
  const { data, isLoading } = useQuery({
    queryKey: ["we.job.getSingleJob", id],
    queryFn: () =>
      APIKit.me.job.application
        .getSingleApplication(id)
        .then(({ data }) => data),
    enabled: !!id,
  });

  if (isLoading) {
    return "Loading...";
  }

  console.log(data);
  return <div>ApplicationDetails</div>;
}
