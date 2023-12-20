"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import APIKit from "@/common/APIkit";

import TitleWithDescription from "../../components/TitleWithDescription";
import UpdateResume from "./components/UpdateResume";
import SkillsFrom from "./components/SkillsFrom";

export default function SkillAndExpertise() {
  const [resume, setResume] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-expertise"],
    queryFn: () =>
      APIKit.me.expertise.getSkillAndExpertise().then(({ data }) => {
        setResume(data?.resume);
        return data;
      }),
  });

  if (isLoading) {
    return "Loading...";
  }

  const initialValues = {
    skills: data?.skills,
    portfolio: data?.portfolio,
    desired_salary: {
      min: data?.desired_salary?.min,
      max: data?.desired_salary?.max,
    },
    open_to_work_remotely: data?.open_to_work_remotely,
  };

  return (
    <div className="space-y-3">
      <TitleWithDescription
        title="Skill and Expertise"
        desc="This will help recruiter hone in on your strengths."
      />
      <hr />

      <div>
        <UpdateResume resume={resume} setResume={setResume} refetch={refetch} />
        <SkillsFrom initialValues={initialValues} refetch={refetch} />
      </div>
    </div>
  );
}
