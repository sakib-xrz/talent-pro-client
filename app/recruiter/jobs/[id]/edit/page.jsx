"use client";

import APIKit from "@/common/APIkit";

import { Card, CardHeader } from "@/components/ui/card";
import Container from "@/components/shared/Container";

import { useQuery } from "@tanstack/react-query";
import EditJobFrom from "./EditJobFrom";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Ban } from "lucide-react";

export default function EditJobPage({ params: { id } }) {
  const { data: job, isLoading } = useQuery({
    queryKey: [`we/job/${id}`],
    queryFn: () => APIKit.we.job.getSingleJob(id).then((data) => data.data),
    enabled: !!id,
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Container>
      <Card>
        <CardHeader className="space-y-4">
          <h2 className="text-center text-3xl font-semibold text-primary ">
            Edit Job Details
          </h2>

          {job.total_applications ? (
            <div className="flex items-center justify-center gap-2 rounded-md bg-red-100 px-3 py-4 text-sm text-red-700 md:text-base">
              <div>
                <Ban className="h-5 w-5" />
              </div>
              <p className="font-semibold">
                This job has received applications and can't be updated.
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 rounded-md bg-sky-100 px-3 py-4 text-sm text-sky-700 md:text-base">
              <div>
                <InformationCircleIcon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <p className="font-semibold">
                Once a candidate applied this job you cannot edit this job.
              </p>
            </div>
          )}
        </CardHeader>

        <EditJobFrom job={job} />
      </Card>
    </Container>
  );
}
