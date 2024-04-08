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

export default function Recruiter() {
  const router = useRouter();
  const { user } = useStore();

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
    <Container className="space-y-4">
      <PageTitleWithButton title="My Dashboard" />

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full space-y-6 lg:w-8/12">
          <ApplicantsCard data={data} />

          <JobPostCard data={data} />
        </div>
      </div>
    </Container>
  );
}
