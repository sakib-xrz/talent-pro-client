"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import APIKit from "@/common/APIkit";

import TitleWithDescription from "../../components/TitleWithDescription";
import UpdateResume from "./components/UpdateResume";

export default function SkillAndExpertise() {
  const [resume, setResume] = useState("");

  const {
    data: expertise,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-expertise"],
    queryFn: () =>
      APIKit.me.expertise.getSkillAndExpertise().then(({ data }) => {
        setResume(data?.resume);
        return data;
      }),
  });

  if (isLoading) "Loading...";

  return (
    <div className="space-y-3">
      <TitleWithDescription
        title="Skill and Expertise"
        desc="This will help recruiter hone in on your strengths."
      />
      <hr />

      <div>
        <UpdateResume resume={resume} setResume={setResume} refetch={refetch} />
      </div>
    </div>
  );
}
