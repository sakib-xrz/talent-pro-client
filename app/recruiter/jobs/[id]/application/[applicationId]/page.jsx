"use client";

import APIKit from "@/common/APIkit";

import Container from "@/components/shared/Container";
import { Card } from "@/components/ui/card";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCheck } from "lucide-react";

import { useRouter } from "next/navigation";
import CandidateSIdebarCard from "./components/CandidateSIdebarCard";
import InfoSection from "./components/InfoSection";
import SkillSection from "./components/SkillSection";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ApplicationDetails({ params }) {
  const { id: jobId, applicationId } = params;

  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`/we/job/${jobId}/application/${applicationId}`],
    queryFn: () =>
      APIKit.we.job.application
        .getSingleApplication(jobId, applicationId)
        .then(({ data }) => data),
    enable: !!jobId && !!applicationId,
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Container>
      <div
        className="mb-3 flex w-fit cursor-pointer items-center gap-1 text-sm font-medium"
        onClick={router.back}
      >
        <ArrowLeft className="h-4 w-4 text-primary" /> Go Back
      </div>

      <div className="grid gap-5 md:grid-cols-12">
        <CandidateSIdebarCard data={data} />

        <Card className="space-y-5 md:col-span-8 xl:col-span-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Image
                width={50}
                height={50}
                src={
                  data?.organization?.company_logo ||
                  "/images/organization_placeholder.jpg"
                }
                alt=""
                className="h-12 w-12 rounded-md border p-2"
              />
              <div>
                <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
                  {data?.job?.job_title || "Not set"}
                </h3>
                <div className="line-clamp-1 text-sm font-medium xl:line-clamp-none">
                  {data?.organization?.company_name || "Not set"} •{" "}
                  {data?.job?.address || "Not set"}
                </div>
              </div>
            </div>

            <Button className="gap-1 whitespace-nowrap" size="sm">
              <CheckCheck className="h-4 w-4" />
              Mark Shortlisted
            </Button>
          </div>
          <hr />
          <InfoSection data={data} />
          <hr />
          <SkillSection data={data} />
          <hr />
          <ExperienceSection data={data} />
          <hr />
          <EducationSection data={data} />
        </Card>
      </div>
    </Container>
  );
}
