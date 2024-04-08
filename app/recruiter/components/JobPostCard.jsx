import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/ui/card";

export default function JobPostCard({ data }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold">Job Postings</h1>
        <div>
          <Link href="recruiter/jobs">
            <Button className="text-base font-semibold " variant="link">
              View All
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="flex items-center justify-between gap-4 !p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-700">
              {data?.total_jobs || 0}
            </h3>
            <p className="text-gray-500">Total Jobs</p>
          </div>
          <Link
            href="/recruiter/jobs"
            className="hover:bg-primary-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          >
            <ArrowRightIcon className="text-primary-600 h-6 w-6" />
          </Link>
        </Card>

        <Card className="flex items-center justify-between gap-4 !p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-700">
              {data?.published_jobs || 0}
            </h3>
            <p className="text-gray-500">Published</p>
          </div>
          <Link
            href="/recruiter/jobs?status=PUBLISHED"
            className="hover:bg-primary-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          >
            <ArrowRightIcon className="text-primary-600 h-6 w-6" />
          </Link>
        </Card>

        <Card className="flex items-center justify-between gap-4 !p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-700">
              {data?.on_hold_jobs || 0}
            </h3>
            <p className="text-gray-500">On Hold</p>
          </div>
          <Link
            href="/recruiter/jobs?status=ON_HOLD"
            className="hover:bg-primary-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          >
            <ArrowRightIcon className="text-primary-600 h-6 w-6" />
          </Link>
        </Card>

        <Card className="flex items-center justify-between gap-4 !p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-700">
              {data?.unpublished_jobs || 0}
            </h3>
            <p className="text-gray-500">Unpublished</p>
          </div>
          <Link
            href="/recruiter/jobs?status=UNPUBLISHED"
            className="hover:bg-primary-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          >
            <ArrowRightIcon className="text-primary-600 h-6 w-6" />
          </Link>
        </Card>

        <Card className="flex items-center justify-between gap-4 !p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-700">
              {data?.closed_jobs || 0}
            </h3>
            <p className="text-gray-500">Closed</p>
          </div>
          <Link
            href="/recruiter/jobs?status=CLOSED"
            className="hover:bg-primary-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          >
            <ArrowRightIcon className="text-primary-600 h-6 w-6" />
          </Link>
        </Card>
      </div>
    </div>
  );
}
