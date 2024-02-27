"use client";

import { useState } from "react";

import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";

import APIKit from "@/common/APIkit";
import { useStore } from "@/context/StoreProvider";

import { Button } from "@/components/ui/button";
import EducationAddForm from "./components/EducationAddForm";
import EducationCard from "./components/EducationCard";
import TitleWithDescription from "../../components/TitleWithDescription";
import EducationCardSkeleton from "./components/skeleton/EducationCardSkeleton";

export default function EducationalBackground() {
  const { user } = useStore();
  const [showEducationAddForm, setShowAddEducationForm] = useState(false);

  const {
    data: userEducation,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-educations", user?.email],
    queryFn: () => APIKit.me.education.getEducation().then(({ data }) => data),
  });

  const educations = userEducation?.education;

  return (
    <div className="space-y-3">
      <TitleWithDescription
        title="Educational Background"
        desc="What schools have you studied at?"
      />
      <hr />

      {isLoading ? (
        [...Array(Number(2)).keys()].map((_, index) => (
          <EducationCardSkeleton key={index} />
        ))
      ) : educations?.length > 0 ? (
        <div className="flex flex-col gap-2">
          {educations.map((education, index) => (
            <EducationCard
              key={index}
              education={education}
              refetch={refetch}
            />
          ))}
        </div>
      ) : (
        <>{!showEducationAddForm && <p>No Education Added</p>}</>
      )}

      {showEducationAddForm ? (
        <EducationAddForm
          setShowAddEducationForm={setShowAddEducationForm}
          refetch={refetch}
        />
      ) : (
        <Button
          onClick={() => setShowAddEducationForm(true)}
          className="w-full gap-2 md:w-fit"
        >
          <PlusSmallIcon className="h-5 w-5" />
          Add Education
        </Button>
      )}
    </div>
  );
}
