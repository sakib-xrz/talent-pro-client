import Image from "next/image";

import { Goal, PauseCircle, Share2 } from "lucide-react";

import { CardDescription } from "@/components/ui/card";
import { getTimeDifference } from "@/common/UtilKit";

export default function JobCardSection({ job }) {
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <h4 className="line-clamp-1 text-lg font-semibold text-primary sm:line-clamp-none">
          About this role
        </h4>
        <div>
          <Share2 className="w-4.5 h-4.5" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            Posted{" "}
            {job?.createdAt ? getTimeDifference(job.createdAt) : "Not set"}
          </p>
          <div>
            {job?.status === "PUBLISHED" ? (
              <div className="flex w-fit items-center gap-2 rounded-md bg-green-100 px-2 py-1 text-green-500">
                <Goal className="h-4 w-4" />
                <p className="text-xs font-medium">Actively Recruiting</p>
              </div>
            ) : (
              <div className="flex w-fit items-center gap-2 rounded-md bg-yellow-100 px-2 py-1 text-yellow-500">
                <PauseCircle className="h-4 w-4" />
                <p className="text-xs font-medium">Recruiting on Hold</p>
              </div>
            )}
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
      </div>
    </div>
  );
}
