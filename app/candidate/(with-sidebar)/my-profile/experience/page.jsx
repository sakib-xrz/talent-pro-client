"use client";

import { useState } from "react";

import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";

import APIKit from "@/common/APIkit";
import { useUser } from "@/context/UserProvider";

import { Button } from "@/components/ui/button";
import ExperienceAddForm from "./components/ExperienceAddForm";
import ExperienceCard from "./components/ExperienceCard";
import TitleWithDescription from "../../components/TitleWithDescription";

export default function ProfessionalExperience() {
  const { user } = useUser();
  const [showExperienceAddForm, setShowAddExperienceForm] = useState(false);
  const {
    data: userExperience,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-experiences", user?.email],
    queryFn: () =>
      APIKit.me.experience.getExperience().then(({ data }) => data),
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
        <>{!showExperienceAddForm && <p>No Experiences Added</p>}</>
      )}

      {showExperienceAddForm ? (
        <ExperienceAddForm
          setShowAddExperienceForm={setShowAddExperienceForm}
          refetch={refetch}
        />
      ) : (
        <Button
          onClick={() => setShowAddExperienceForm(true)}
          className="w-full gap-2 md:w-fit"
        >
          <PlusSmallIcon className="h-5 w-5" />
          Add Experience
        </Button>
      )}
    </div>
  );
}
