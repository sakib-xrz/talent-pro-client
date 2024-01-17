import { formatText, getTimeDifference } from "@/common/UtilKit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const badgeColor = {
  application_received:
    "text-green-600 bg-green-100 hover:text-green-600 hover:bg-green-100", // Success
  application_in_review:
    "text-sky-600 bg-sky-100 hover:text-sky-600 hover:bg-sky-100", // Info
  shortlisted_for_interview:
    "text-sky-600 bg-sky-100 hover:text-sky-600 hover:bg-sky-100", // Info
  interview_scheduled:
    "text-sky-600 bg-sky-100 hover:text-sky-600 hover:bg-sky-100", // Info
  interview_completed:
    "text-green-600 bg-green-100 hover:text-green-600 hover:bg-green-100", // Success
  hired: "text-green-600 bg-green-100 hover:text-green-600 hover:bg-green-100", // Success
  interview_rescheduled:
    "text-sky-600 bg-sky-100 hover:text-sky-600 hover:bg-sky-100", // Info
  interview_canceled:
    "text-red-600 bg-red-100 hover:text-red-600 hover:bg-red-100", // Error
  not_selected: "text-red-600 bg-red-100 hover:text-red-600 hover:bg-red-100", // Error
};

export default function MyApplicationCard({ application }) {
  return (
    <Card className={"space-y-3"}>
      <div className="flex flex-col-reverse gap-2 xs:flex-row xs:justify-between">
        <p className="text-sm font-medium">
          Applied{" "}
          {application?.createdAt
            ? getTimeDifference(application.createdAt)
            : "Not set"}
        </p>
        <Badge
          size="lg"
          className={`${
            badgeColor[application?.status]
          } hidden hover:cursor-default xs:block`}
        >
          {formatText(application?.status)}
        </Badge>
        <p
          className={`rounded-md p-2 text-sm font-medium xs:hidden ${
            badgeColor[application?.status]
          }`}
        >
          {formatText(application?.status)}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            src={
              application?.organization?.company_logo ||
              "/images/organization_placeholder.jpg"
            }
            alt=""
            className="h-12 w-12 rounded-md border p-2"
          />
          <div>
            <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
              {application?.job?.job_title || "Not set"}
            </h3>
            <div className="line-clamp-1 text-sm font-medium xl:line-clamp-none">
              {application?.organization?.company_name || "Not set"} •{" "}
              {application?.organization?.company_location || "Not set"}
            </div>
          </div>
        </div>

        <div className="space-x-2">
          <Badge variant="secondary">
            {application?.job?.experience_level
              ? `${formatText(application?.job?.experience_level)} level`
              : "Not set"}
          </Badge>
          <Badge variant="secondary">
            {application?.job?.job_type
              ? formatText(application?.job?.job_type)
              : "Not set"}
          </Badge>
          <Badge variant="secondary">
            {application?.job?.location_type
              ? formatText(application?.job?.location_type)
              : "Not set"}
          </Badge>
        </div>

        <Link
          className="block w-full"
          href={`/candidate/my-applications/${application?._id}`}
        >
          <Button className="w-full">View Application Details</Button>
        </Link>
      </div>
    </Card>
  );
}
