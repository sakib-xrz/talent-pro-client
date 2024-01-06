import Image from "next/image";

import { Share2 } from "lucide-react";

import { CardDescription } from "@/components/ui/card";

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
          <CardDescription className="line-clamp-1 lg:line-clamp-none">
            {job?.organization?.company_name || "Company name not set"} •{" "}
            {job?.address || "Job location not set"}
          </CardDescription>
        </div>
      </div>
    </div>
  );
}
