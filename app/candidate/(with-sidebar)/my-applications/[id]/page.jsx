"use client";

import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import APIKit from "@/common/APIkit";
import { ApplicationStatus } from "@/common/KeyChain";
import { getTimeDifference } from "@/common/UtilKit";

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

  return (
    <Card className="space-y-5">
      <div className="flex items-center gap-2">
        <Image
          width={50}
          height={50}
          src={
            data?.organization?.company_logo ||
            "/images/organization_placeholder.jpg"
          }
          alt=""
          className="h-12 w-12 rounded-md border p-2"
          quality={100}
        />
        <div>
          <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
            {data?.job?.job_title || "Not set"}
          </h3>
          <div className="line-clamp-1 text-sm font-medium xl:line-clamp-none">
            {data?.organization?.company_name || "Not set"} •{" "}
            {data?.job?.address || "Not set"}
          </div>
        </div>
      </div>

      <hr />

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Application Status</h3>
        <div className="flex items-center gap-3">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <div>
            <h3 className="font-medium ">
              {data?.status &&
                ApplicationStatus.find((status) => status.value === data.status)
                  ?.label}
            </h3>
            <p className="text-sm font-medium text-gray-500">
              Applied {getTimeDifference(data?.createdAt) || "0 min ago"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
