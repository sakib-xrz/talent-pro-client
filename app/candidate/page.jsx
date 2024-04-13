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
import { Skeleton } from "@/components/ui/skeleton";

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
        {isLoading ? (
          <div className="mt-5 grid w-full gap-4 sm:grid-cols-2 lg:w-8/12">
            {[...Array(Number(6)).keys()].map((index) => (
              <Card
                key={index}
                className="flex items-center justify-between gap-4 !p-4"
              >
                <div className="space-y-3">
                  <Skeleton className="h-6 w-10" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <Skeleton
                  href="candidate/my-applications"
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                />
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-5 grid w-full gap-4 sm:grid-cols-2 lg:w-8/12">
            <Card className="flex items-center justify-between gap-4 !p-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-700">
                  {data?.total_applied_jobs || 0}
                </h3>
                <p className="text-muted-foreground">Total Applied Jobs</p>
              </div>
              <Link
                href="candidate/my-applications"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-primary/5"
              >
                <ArrowRightIcon className="h-6 w-6 text-primary" />
              </Link>
            </Card>
            <Card className="flex items-center justify-between gap-4 !p-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-700">
                  {data?.total_saved_jobs || 0}
                </h3>
                <p className="text-muted-foreground">Saved Jobs</p>
              </div>
              <Link
                href="/candidate/saved-jobs"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-primary/5"
              >
                <ArrowRightIcon className="h-6 w-6 text-primary" />
              </Link>
            </Card>
            <Card className="flex items-center justify-between gap-4 !p-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-700">
                  {data?.total_job_offers || 0}
                </h3>
                <p className="text-muted-foreground">Jobs Offers</p>
              </div>
              <Link
                href="/candidate/my-applications?status=hired"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-primary/5"
              >
                <ArrowRightIcon className="h-6 w-6 text-primary" />
              </Link>
            </Card>
            <Card className="flex items-center justify-between gap-4 !p-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-700">
                  {data?.total_in_review || 0}
                </h3>
                <p className="text-muted-foreground">In Review</p>
              </div>
              <Link
                href="/candidate/my-applications?status=application_in_review"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-primary/5"
              >
                <ArrowRightIcon className="h-6 w-6 text-primary" />
              </Link>
            </Card>
            <Card className="flex items-center justify-between gap-4 !p-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-700">
                  {data?.total_shortlisted || 0}
                </h3>
                <p className="text-muted-foreground">
                  Shortlisted for Interview
                </p>
              </div>
              <Link
                href="/candidate/my-applications?status=shortlisted_for_interview"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-primary/5"
              >
                <ArrowRightIcon className="h-6 w-6 text-primary" />
              </Link>
            </Card>
            <Card className="flex items-center justify-between gap-4 !p-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-700">
                  {data?.total_rejected || 0}
                </h3>
                <p className="text-muted-foreground">Not Selected</p>
              </div>
              <Link
                href="/candidate/my-applications?status=not_selected"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-primary/5"
              >
                <ArrowRightIcon className="h-6 w-6 text-primary" />
              </Link>
            </Card>
          </div>
        )}

        <ProfileCard />
      </div>
    </Container>
  );
}
