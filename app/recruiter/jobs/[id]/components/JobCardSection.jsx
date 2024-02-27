import Image from "next/image";

import { getTimeDifference } from "@/common/UtilKit";

import SocialShare from "./SocialShare";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Link from "next/link";

export default function JobCardSection({ job }) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            Posted{" "}
            {job?.createdAt ? getTimeDifference(job.createdAt) : "Not set"}
          </p>

          <div className="hidden items-center gap-3 sm:flex">
            <SocialShare job={job} />
            <Link href={`/recruiter/jobs/${job._id}/application`}>
              <Button className="items-center gap-2">
                <Users className="w-4" />
                <p className="font-semibold">View Applicants</p>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            src={
              job?.organization?.company_logo ||
              "/images/organization_placeholder.jpg"
            }
            alt=""
            className="h-12 w-12 rounded-md border p-2"
          />
          <div>
            <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
              {job?.job_title || "Job title not set"}
            </h3>
            <div className="line-clamp-1 text-sm font-medium xl:line-clamp-none">
              {job?.organization?.company_name || "Company name not set"} •{" "}
              {job?.address || "Job location not set"}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 xs:flex-row xs:items-center sm:hidden">
          <div className="w-full">
            <SocialShare job={job} />
          </div>
          <Link
            href={`/recruiter/jobs/${job._id}/application`}
            className="w-full"
          >
            <Button className="w-full items-center gap-2">
              <Users className="w-4" />
              <p className="font-semibold">View Applicants</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
