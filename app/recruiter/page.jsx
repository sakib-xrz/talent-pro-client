"use client";

import Container from "@/components/shared/Container";
import PageTitleWithButton from "@/components/shared/PageTitleWithButton";
import { useStore } from "@/context/StoreProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/APIkit";
import ApplicantsCard from "./components/ApplicantsCard";
import JobPostCard from "./components/JobPostCard";
import Image from "next/image";

export default function Recruiter() {
  const router = useRouter();
  const { user, organization } = useStore();

  console.log("user", user);
  console.log("organization", organization);

  useEffect(() => {
    if (user?.isOnboardComplete === false) {
      router.push("/recruiter/setup-profile");
    } else {
      router.push("/recruiter");
    }
  }, [router, user?.isOnboardComplete]);

  const { data, isLoading } = useQuery({
    queryKey: ["recruiter", "dashboard"],
    queryFn: () => APIKit.we.getDashboard().then(({ data }) => data),
  });

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <PageTitleWithButton title="My Dashboard" />

      <div className="mt-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md border border-border">
            <Image
              height={200}
              width={200}
              src={organization?.company_logo}
              alt="profile-pic"
              priority={true}
              className="h-14 w-14 object-cover object-center"
            />
          </div>
          <div>
            <h1 className="text-base font-semibold text-neutral-700">
              Hi, {user?.name?.first_name + " " + user?.name?.last_name}
            </h1>
            <p className="text-base font-medium text-neutral-500">
              {organization?.company_name || "Not Set"} | Recruiter
            </p>
          </div>
        </div>
        <div className="w-full space-y-6 ">
          <ApplicantsCard data={data} />

          <JobPostCard data={data} />
        </div>
      </div>
    </Container>
  );
}
