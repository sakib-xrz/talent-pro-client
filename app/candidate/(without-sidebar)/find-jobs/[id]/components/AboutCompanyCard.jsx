import { formatText } from "@/common/UtilKit";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AboutCompanyCard({ job, id }) {
  return (
    <Card className="space-y-5 lg:sticky lg:top-24 ">
      <h4 className="line-clamp-1 text-lg font-semibold text-primary sm:line-clamp-none">
        About company
      </h4>
      <div className="space-y-2">
        <div className="flex items-center justify-start gap-4">
          <GlobeAltIcon className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm">Website</p>
            <a
              href={job?.organization?.website || "#"}
              target="_blank"
              className="text-md line-clamp-1 cursor-pointer font-semibold text-primary underline underline-offset-2"
            >
              {job?.organization?.website || "Not set"}
            </a>
          </div>
        </div>
        <div className="flex items-center justify-start gap-4">
          <MapPinIcon className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm">Location</p>
            <p className="text-md line-clamp-1 font-semibold text-primary">
              {job?.organization?.company_location || "Not set"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start gap-4">
          <BriefcaseIcon className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm">Industry</p>
            <p className="text-md line-clamp-1 font-semibold text-primary">
              {job?.organization?.industry
                ? formatText(job?.organization?.industry)
                : "Not set"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start gap-4">
          <BuildingOffice2Icon className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm">Company Size</p>
            <p className="text-md line-clamp-1 font-semibold text-primary">
              {job?.organization?.company_size
                ? `${job?.organization?.company_size} people`
                : "Not set"}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Link href={`/candidate/find-jobs/${id}/apply`} className="w-full">
          <Button className="w-full">Apply Now</Button>
        </Link>
      </div>
    </Card>
  );
}
