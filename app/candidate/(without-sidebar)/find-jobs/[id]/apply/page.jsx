"use client";

import APIKit from "@/common/APIkit";
import { Card } from "@/components/ui/card";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import ApplicationForm from "./components/ApplicationForm";

export default function ApplyJob() {
  const pathname = usePathname();
  const jobId = pathname.split("/")[3];

  const { data: candidate, isLoading: isCandidateLoading } = useQuery({
    queryKey: ["get-my-profile"],
    queryFn: () => APIKit.me.getCandidateProfile().then((data) => data.data),
  });

  const { data: job, isLoading: isJobLoading } = useQuery({
    queryKey: [`me/job/${jobId}`],
    queryFn: () => APIKit.me.job.getSingleJob(jobId).then((data) => data.data),
    enabled: !!jobId,
  });

  if (isJobLoading || isCandidateLoading) return "Loading...";

  return (
    <>
      <h2 className="bg-primary/5 px-4 py-10 text-center text-lg font-semibold text-primary">
        Apply for {job?.job_title} at {job?.organization?.company_name}
      </h2>

      <div className="mx-auto max-w-3xl px-5 py-10 lg:px-0">
        <Card>
          <div className="mb-4 flex items-start justify-center gap-2 rounded-md bg-sky-100 px-3 py-4 text-sm text-sky-700 md:text-base">
            <div>
              <InformationCircleIcon className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <p className="font-semibold">
              Changing any information in this form won't update your profile
              information.
            </p>
          </div>
          <ApplicationForm job={job} candidate={candidate} />
        </Card>
      </div>
    </>
  );
}
