"use client";

import APIKit from "@/common/APIkit";

import Container from "@/components/shared/Container";
import { Card } from "@/components/ui/card";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { useRouter } from "next/navigation";
import CandidateSIdebarCard from "./components/CandidateSIdebarCard";
import InfoSection from "./components/InfoSection";
import SkillSection from "./components/SkillSection";
import ExperienceSection from "./components/ExperienceSection";

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
          <InfoSection data={data} />
          <hr />
          <SkillSection data={data} />
          <hr />
          <ExperienceSection data={data} />
          <hr />
        </Card>
      </div>
    </Container>
  );
}
