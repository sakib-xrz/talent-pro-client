import { useState } from "react";

import {
  BriefcaseIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

import APIKit from "@/common/APIkit";
import { formatDate, formatText } from "@/common/UtilKit";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ExperienceEditFrom from "./ExperienceEditFrom";

export default function ExperienceCard({ experience, refetch }) {
  const [showExperienceEditForm, setShowExperienceEditForm] = useState(false);
  const {
    _id,
    company_name,
    designation,
    job_type,
    end_date,
    start_date,
    work_currently,
  } = experience;

  const handleDeleteExperience = (id) => {
    const handleSuccess = () => {
      refetch();
    };
    const handleFailure = (error) => {
      throw error;
    };
    const promise = APIKit.me.experience
      .deleteExperience(id)
      .then(handleSuccess)
      .catch(handleFailure);

    return toast.promise(promise, {
      loading: "Deleting professional experience...",
      success: "Experience deleted successfully!",
      error: "Something went wrong!",
    });
  };

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
              <h3 className="text-base font-semibold">
                {designation || "Not set"}
              </h3>
              <p className="text-base font-medium">
                {company_name || "Not set"} •{" "}
                {formatText(job_type) || "Not Set"}
              </p>
              <p className="mt-2 text-sm font-medium text-accent-foreground">
                {formatDate(start_date) || "Not set"} -{" "}
                {work_currently
                  ? "Present"
                  : end_date
                    ? formatDate(end_date)
                    : "Not set"}
              </p>
            </div>
          </div>
          <div className="flex w-full gap-2 sm:w-auto sm:flex-col">
            <Button
              onClick={() => setShowExperienceEditForm(true)}
              variant="outline"
              className="flex w-1/2 items-center gap-2 sm:w-full"
            >
              <PencilSquareIcon className="h-5 w-5" />
              Update
            </Button>

            <AlertDialog className="mx-auto w-10/12">
              <AlertDialogTrigger className="w-1/2 sm:w-full">
                <Button variant="outline" className="w-full gap-2">
                  <TrashIcon className="h-5 w-5" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone and permanently delete this
                    experience from our database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteExperience(_id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </>
  );
}
