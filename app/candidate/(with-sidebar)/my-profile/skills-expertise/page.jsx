"use client";

import { useQuery } from "@tanstack/react-query";
import TitleWithDescription from "../../components/TitleWithDescription";
import APIKit from "@/common/APIkit";
import UpdateResume from "./components/UpdateResume";

export default function SkillAndExpertise() {
  const {
    data: expertise,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-expertise"],
    queryFn: () =>
      APIKit.me.expertise.getSkillAndExpertise().then(({ data }) => data),
  });

  if (isLoading) "Loading...";

  const resumeData = {
    resume: undefined,
    resume_preview: expertise?.resume,
  };

  return (
    <div className="space-y-3">
      <TitleWithDescription
        title="Skill and Expertise"
        desc="This will help recruiter hone in on your strengths."
      />
      <hr />

      <div>
        <UpdateResume resumeData={resumeData} refetch={refetch} />
      </div>
    </div>
  );
}
