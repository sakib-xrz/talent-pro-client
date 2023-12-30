import Image from "next/image";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { EyeIcon, ShareIcon, UsersIcon } from "@heroicons/react/24/outline";
import SelectField from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobOptions } from "@/common/KeyChain";
import { formatText, getTimeDifference } from "@/common/UtilKit";
import Link from "next/link";

export default function RecruiterJobCard({ job }) {
  return (
    <Card className={"space-y-4"}>
      <div className="flex flex-col-reverse justify-between gap-2 lg:flex-row lg:items-center">
        <CardDescription>
          Posted {job?.createdAt ? getTimeDifference(job.createdAt) : "Not set"}
        </CardDescription>
        <div className="flex items-center gap-6 ">
          <div className="flex items-center gap-2 text-primary">
            <EyeIcon className="h-5 w-5" />
            <CardDescription>{job?.total_views || 0} Views</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <UsersIcon className="h-5 w-5" />
            <CardDescription>
              {job?.total_applications || 0} Applied
            </CardDescription>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            src={"/images/google.jpg"}
            alt=""
            className="h-12 w-12 rounded-md border p-2"
          />
          <div>
            <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
              {job?.job_title || "Not set"}
            </h3>
            <CardDescription className="line-clamp-1 lg:line-clamp-none">
              {job?.organization?.company_name || "Not set"} •{" "}
              {job?.address || "Not set"}
            </CardDescription>
          </div>
        </div>
        <div className="space-x-2">
          <Badge variant="secondary">
            {job?.experience_level
              ? `${formatText(job?.experience_level)} level`
              : "Not set"}
          </Badge>
          <Badge variant="secondary">
            {job?.job_type ? formatText(job?.job_type) : "Not set"}
          </Badge>
          <Badge variant="secondary">
            {job?.location_type ? formatText(job?.location_type) : "Not set"}
          </Badge>
        </div>
      </div>
      <div>
        <SelectField
          options={JobOptions}
          defaultValue={JobOptions.find((el) => el.value === job?.status)}
        />
      </div>
      <div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <Button variant="secondary" className="w-full gap-2">
            <div>
              <ShareIcon className="h-4 w-4" />
            </div>{" "}
            <p> Get Shared Link</p>
          </Button>
          <Link className="block w-full" href={`/recruiter/jobs/${job?._id}`}>
            <Button className="w-full">View Job Details</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
