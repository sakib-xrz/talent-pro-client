import { formatText } from "@/common/UtilKit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const badgeColor = {
  application_received: "text-green-600 bg-green-100", // Success
  application_in_review: "text-sky-600 bg-sky-100", // Info
  shortlisted_for_interview: "text-sky-600 bg-sky-100", // Info
  interview_scheduled: "text-sky-600 bg-sky-100", // Info
  interview_completed: "text-green-600 bg-green-100", // Success
  hired: "text-green-600 bg-green-100", // Success
  interview_rescheduled: "text-sky-600 bg-sky-100", // Info
  interview_canceled: "text-red-600 bg-red-100", // Error
  not_selected: "text-red-600 bg-red-100", // Error
};

export default function MyApplicationCard() {
  return (
    <Card className={"space-y-3"}>
      <div className="flex flex-col-reverse gap-2 xs:flex-row xs:justify-between">
        <p className="text-sm font-medium">Applied 1 day ago</p>
        <Badge
          size="lg"
          className={`${badgeColor["shortlisted_for_interview"]} hidden xs:block`}
        >
          {formatText("shortlisted_for_interview")}
        </Badge>
        <p
          className={`rounded-md p-2 font-medium xs:hidden ${badgeColor["shortlisted_for_interview"]}`}
        >
          {formatText("shortlisted_for_interview")}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            src={"/images/organization_placeholder.jpg"}
            alt=""
            className="h-12 w-12 rounded-md border p-2"
          />
          <div>
            <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
              Frontend Developer
            </h3>
            <div className="line-clamp-1 text-sm font-medium xl:line-clamp-none">
              Google • 1600 Amphitheatre Parkway in Mountain View, California.
            </div>
          </div>
        </div>

        <div className="space-x-2">
          <Badge variant="secondary">{formatText("ENTRY")} level</Badge>
          <Badge variant="secondary">{formatText("FULL_TIME")}</Badge>
          <Badge variant="secondary">{formatText("ONSITE")}</Badge>
        </div>

        <Link className="block w-full" href={`/candidate/my-applications/id`}>
          <Button className="w-full">View Application Details</Button>
        </Link>
      </div>
    </Card>
  );
}
