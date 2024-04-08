"use client";

import APIKit from "@/common/APIkit";
import Container from "@/components/shared/Container";
import { useStore } from "@/context/StoreProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ProfileCard from "./components/ProfileCard";

export default function Candidate() {
  const router = useRouter();
  const { user } = useStore();

  useEffect(() => {
    if (user?.isOnboardComplete === false) {
      router.push("/candidate/setup-profile");
    } else {
      router.push("/candidate");
    }
  }, [router, user?.isOnboardComplete]);

  const { data, isLoading } = useQuery({
    queryKey: ["recruiter", "dashboard"],
    queryFn: () => APIKit.me.getDashboard().then(({ data }) => data),
  });

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h1 className="text-2xl font-semibold capitalize text-gray-700 md:text-3xl">
        Welcome{" "}
        {user?.name?.first_name && user?.name?.last_name
          ? `${
              (user?.name?.first_name).toLowerCase() +
              " " +
              (user?.name?.last_name).toLowerCase()
            }`
          : "Name was not set"}
        !
      </h1>

      <div className="flex flex-col-reverse gap-6 space-y-4 lg:flex-row">
        <div className="mt-5 grid w-full gap-4 sm:grid-cols-2 lg:w-8/12">
          <Card className="flex items-center justify-between gap-4 !p-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-700">
                {data?.total_applied_jobs || 0}
              </h3>
              <p className="text-gray-500">Total Applied Jobs</p>
            </div>
            <Link
              href="candidate/my-applications"
              className="hover:bg-primary-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            >
              <ArrowRightIcon className="text-primary-600 h-6 w-6" />
            </Link>
          </Card>
          <Card className="flex items-center justify-between gap-4 !p-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-700">
                {data?.total_saved_jobs || 0}
              </h3>
              <p className="text-gray-500">Saved Jobs</p>
            </div>
            <Link
              href="/candidate/saved-jobs"
              className="hover:bg-primary-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            >
              <ArrowRightIcon className="text-primary-600 h-6 w-6" />
            </Link>
          </Card>
          <Card className="flex items-center justify-between gap-4 !p-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-700">
                {data?.total_job_offers || 0}
              </h3>
              <p className="text-gray-500">Jobs Offers</p>
            </div>
            <Link
              href="/candidate/my-applications?status=hired"
              className="hover:bg-primary-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            >
              <ArrowRightIcon className="text-primary-600 h-6 w-6" />
            </Link>
          </Card>
          <Card className="flex items-center justify-between gap-4 !p-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-700">
                {data?.total_in_review || 0}
              </h3>
              <p className="text-gray-500">In Review</p>
            </div>
            <Link
              href="/candidate/my-applications?status=application_in_review"
              className="hover:bg-primary-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            >
              <ArrowRightIcon className="text-primary-600 h-6 w-6" />
            </Link>
          </Card>
          <Card className="flex items-center justify-between gap-4 !p-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-700">
                {data?.total_shortlisted || 0}
              </h3>
              <p className="text-gray-500">Shortlisted for Interview</p>
            </div>
            <Link
              href="/candidate/my-applications?status=shortlisted_for_interview"
              className="hover:bg-primary-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            >
              <ArrowRightIcon className="text-primary-600 h-6 w-6" />
            </Link>
          </Card>
          <Card className="flex items-center justify-between gap-4 !p-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-700">
                {data?.total_rejected || 0}
              </h3>
              <p className="text-gray-500">Not Selected</p>
            </div>
            <Link
              href="/candidate/my-applications?status=not_selected"
              className="hover:bg-primary-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            >
              <ArrowRightIcon className="text-primary-600 h-6 w-6" />
            </Link>
          </Card>
        </div>

        <ProfileCard />
      </div>
    </Container>
  );
}
