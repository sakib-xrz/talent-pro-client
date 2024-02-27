import { useState } from "react";

import {
  AcademicCapIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";

import APIKit from "@/common/APIkit";
import { formatDate } from "@/common/UtilKit";

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
import EducationEditFrom from "./EducationEditFrom";
import EducationCardSkeleton from "./skeleton/EducationCardSkeleton";

export default function EducationCard({ education, refetch }) {
  const [showEducationEditForm, setShowEducationEditForm] = useState(false);
  const {
    _id,
    institute_name,
    degree,
    major,
    location,
    start_date,
    end_date,
    study_currently,
  } = education;

  const handleDeleteEducation = (id) => {
    const handleSuccess = () => {
      refetch();
    };
    const handleFailure = (error) => {
      throw error;
    };
    const promise = APIKit.me.education
      .deleteEducation(id)
      .then(handleSuccess)
      .catch(handleFailure);

    return toast.promise(promise, {
      loading: "Deleting this education...",
      success: "Education deleted successfully!",
      error: "Something went wrong!",
    });
  };

  return (
    <>
      {showEducationEditForm ? (
        <EducationEditFrom
          education={education}
          setShowEducationEditForm={setShowEducationEditForm}
          refetch={refetch}
        />
      ) : (
        <div className="flex flex-col items-start justify-between gap-2 rounded-lg border p-3 sm:flex-row">
          <div className="flex gap-4">
            <div className="flex items-start justify-center">
              <AcademicCapIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold">
                {institute_name || "Not set"}
              </h3>
              <p className="text-base font-medium">
                {degree || "Not set"} • {major || "Not set"}
              </p>
              <p className="text-base font-medium">{location || "Not set"}</p>
              <p className="mt-2 text-sm font-medium text-accent-foreground">
                {formatDate(start_date) || "Not set"} -{" "}
                {study_currently
                  ? "Present"
                  : end_date
                  ? formatDate(end_date)
                  : "Not set"}
              </p>
            </div>
          </div>
          <div className="flex w-full gap-2 sm:w-auto sm:flex-col">
            <Button
              onClick={() => setShowEducationEditForm(true)}
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
                    education from our database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteEducation(_id)}
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
