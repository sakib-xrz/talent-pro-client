"use client";

import APIKit from "@/common/APIkit";
import TitleWithDescription from "../../components/TitleWithDescription";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/context/UserProvider";
import ExperienceCard from "./components/ExperienceCard";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function ProfessionalExperience() {
  const { user } = useUser();
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const {
    data: userExperience,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-experiences", user?.email],
    queryFn: () => APIKit.me.getExperience().then(({ data }) => data),
  });

  if (isLoading) {
    return "Loading...";
  }

  const experiences = userExperience?.experience;

  return (
    <div className="space-y-3">
      <TitleWithDescription
        title="Professional Experience"
        desc="What other positions have you held?"
      />
      <hr />
      {experiences?.length > 0 ? (
        <div className="flex flex-col gap-2">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              refetch={refetch}
            />
          ))}
        </div>
      ) : (
        <>{!showExperienceForm && <p>No Experiences added</p>}</>
      )}
    </div>
  );
}
