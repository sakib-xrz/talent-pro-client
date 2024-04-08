import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MonitorX, BookOpenCheck } from "lucide-react";
import {
  BriefcaseIcon,
  CalendarIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";

export default function ApplicantsCard({ data }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold">Applicants</h1>
        <div>
          <Link href="recruiter/applications">
            <Button className="text-base font-semibold " variant="link">
              View All
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex items-center justify-between gap-4 !p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold ">
              {data?.total_applications || 0}
            </h3>
            <p className="text-muted-foreground">Total Applicants</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <UserGroupIcon className="h-6 w-6 text-primary" />
          </div>
        </Card>

        <Card className="flex items-center justify-between gap-4 !p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold ">
              {data?.in_review_applications || 0}
            </h3>
            <p className="text-muted-foreground">In Review</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <BookOpenCheck className="h-6 w-6 text-primary" />
          </div>
        </Card>

        <Card className="flex items-center justify-between gap-4 !p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold ">
              {data?.interview_scheduled_application || "0"}
            </h3>
            <p className="text-muted-foreground">Interview Scheduled</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <CalendarIcon className="h-6 w-6 text-primary" />
          </div>
        </Card>

        <Card className="flex items-center justify-between gap-4 !p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold ">
              {data?.interview_completed_applications || 0}
            </h3>
            <p className="text-muted-foreground">Interview Completed</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <VideoCameraIcon className="h-6 w-6 text-primary" />
          </div>
        </Card>

        <Card className="flex items-center justify-between gap-4 !p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold ">
              {data?.hired_applications || 0}
            </h3>
            <p className="text-muted-foreground">Hired</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <BriefcaseIcon className="h-6 w-6 text-primary" />
          </div>
        </Card>

        <Card className="flex items-center justify-between gap-4 !p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold ">
              {data?.total_unselected || "0"}
            </h3>
            <p className="text-muted-foreground">Not Selected</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <MonitorX className="h-6 w-6 text-primary" />
          </div>
        </Card>
      </div>
    </div>
  );
}
