import { formatDate, formatText } from "@/common/UtilKit";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useState } from "react";
import ExperienceEditFrom from "./ExperienceEditFrom";

export default function ExperienceCard({ experience, refetch }) {
  const [showExperienceEditForm, setShowExperienceEditForm] = useState(false);
  const {
    company_name,
    designation,
    end_date,
    job_type,
    start_date,
    work_currently,
  } = experience;

  return (
    <>
      {showExperienceEditForm ? (
        <ExperienceEditFrom
          experience={experience}
          setShowExperienceEditForm={setShowExperienceEditForm}
          refetch={refetch}
        />
      ) : (
        <div className="flex flex-col items-start justify-between gap-2 rounded-lg border p-3 sm:flex-row">
          <div className="flex gap-4">
            <div className="flex items-start justify-center">
              <BriefcaseIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold">{designation}</h3>
              <p className="text-base font-medium">
                {company_name} • {formatText(job_type)}
              </p>
              <p className="mt-2 text-sm font-medium text-accent-foreground">
                {formatDate(start_date)} - Present
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <Button
              onClick={() => setShowExperienceEditForm(true)}
              variant="outline"
              className="flex w-full items-center gap-2"
            >
              <PencilSquareIcon className="h-5 w-5" />
              Edit
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
