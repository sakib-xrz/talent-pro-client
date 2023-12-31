"use client";

import Link from "next/link";

import { DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

import APIKit from "@/common/APIkit";

import FileUpload from "@/components/form/FileUpload";

export default function UpdateResume({ resume, setResume, refetch }) {
  const handleResumeUpdate = (event) => {
    const formData = new FormData();
    formData.append("resume", event.target.files[0]);
    const promise = APIKit.me
      .updateResume(formData)
      .then(refetch)
      .catch((error) => {
        throw error;
      });

    return toast.promise(promise, {
      loading: "Updating resume...",
      success: "Resume updated successfully",
      error: "Something went wrong",
    });
  };

  return (
    <div>
      {resume ? (
        <div className="space-y-1">
          <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
            <div className="flex items-center gap-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-input/50">
                <DocumentTextIcon className="h-6 w-6 text-primary" />
              </div>
              <Link
                href={resume}
                className="cursor-pointer font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume.pdf
              </Link>
            </div>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setResume("")}
            />
          </div>
        </div>
      ) : (
        <FileUpload
          id="resume"
          name="resume"
          htmlFor="resume"
          title="Select and upload your resume"
          helperText="Supported only PDF up to 10 mb"
          accept=".pdf"
          onChange={handleResumeUpdate}
        />
      )}
    </div>
  );
}
