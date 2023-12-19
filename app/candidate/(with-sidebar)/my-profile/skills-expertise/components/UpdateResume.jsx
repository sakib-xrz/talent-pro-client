import FileUpload from "@/components/form/FileUpload";
import { DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function UpdateResume({ resumeData, refetch }) {
  const { resume_preview } = resumeData;

  return (
    <div>
      {resume_preview ? (
        <div className="space-y-1">
          <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
            <div className="flex items-center gap-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-input/50">
                <DocumentTextIcon className="h-6 w-6 text-primary" />
              </div>
              <Link
                href={resume_preview}
                className="cursor-pointer font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume.pdf
              </Link>
            </div>
            {/* <XMarkIcon
              className="h-6 w-6 cursor-pointer"
              onClick={handleRemoveResume}
            /> */}
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
          //   onChange={handleFileUpload}
        />
      )}
    </div>
  );
}
