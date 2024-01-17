import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { BookmarkIcon, ShareIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { Check, CopyIcon, CheckCheck } from "lucide-react";
import { toast } from "sonner";

import APIKit from "@/common/APIkit";
import { formatText, getBaseUrl, getTimeDifference } from "@/common/UtilKit";
import { useStore } from "@/context/StoreProvider";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CandidateJobCard({
  job,
  saveJobsList,
  saveJobsListRefetch,
  refetch,
}) {
  const { user } = useStore();
  const [isCopied, setIsCopied] = useState(false);

  const baseUrl = getBaseUrl();

  const isJobSaved = saveJobsList?.some((id) => id === job._id);
  const isAppliedJob = job.applied_by?.some((id) => id === user._id);

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      toast.success("Job link copied to clipboard");
    } catch (err) {
      console.error("Error copying to clipboard:", err);
    }
  };

  const handleAddSaveJob = (id) => {
    const handleSuccess = () => {
      saveJobsListRefetch();
      refetch();
    };
    const handleFailure = (error) => {
      throw error;
    };
    const promise = APIKit.job.save
      .postSaveJob(id)
      .then(handleSuccess)
      .catch(handleFailure);
    return toast.promise(promise, {
      loading: "Saving this job...",
      success: "Job saved successfully!",
      error: "Something went wrong!",
    });
  };

  const handleRemoveSaveJob = (id) => {
    const handleSuccess = () => {
      saveJobsListRefetch();
      refetch();
    };
    const handleFailure = (error) => {
      throw error;
    };
    const promise = APIKit.job.save
      .removeSaveJob(id)
      .then(handleSuccess)
      .catch(handleFailure);
    return toast.promise(promise, {
      loading: "Removing from save jobs...",
      success: "Removed from save jobs!",
      error: "Something went wrong!",
    });
  };

  return (
    <Card className={"space-y-3"}>
      <div className="flex justify-between gap-2">
        <p className="text-sm font-medium">
          Posted {job?.createdAt ? getTimeDifference(job.createdAt) : "Not set"}
        </p>

        {isAppliedJob ? (
          <Badge className="flex items-center gap-1 bg-green-100 text-green-500">
            <CheckCheck className="h-4 w-4" />
            Applied
          </Badge>
        ) : (
          <div className="cursor-pointer text-primary">
            {isJobSaved ? (
              <BookmarkIconSolid
                className="h-6 w-6"
                onClick={() => handleRemoveSaveJob(job._id)}
              />
            ) : (
              <BookmarkIcon
                className="h-6 w-6"
                onClick={() => handleAddSaveJob(job._id)}
              />
            )}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            src={
              job?.organization?.company_logo ||
              "/images/organization_placeholder.jpg"
            }
            alt=""
            className="h-12 w-12 rounded-md border p-2"
          />
          <div>
            <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
              {job?.job_title || "Not set"}
            </h3>
            <div className="line-clamp-1 text-sm font-medium xl:line-clamp-none">
              {job?.organization?.company_name || "Not set"} •{" "}
              {job?.address || "Not set"}
            </div>
          </div>
        </div>

        <div className="space-x-2">
          <Badge variant="secondary">
            {job?.experience_level
              ? `${formatText(job?.experience_level)} level`
              : "Not set"}
          </Badge>
          <Badge variant="secondary">
            {job?.job_type ? formatText(job?.job_type) : "Not set"}
          </Badge>
          <Badge variant="secondary">
            {job?.location_type ? formatText(job?.location_type) : "Not set"}
          </Badge>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-2 sm:flex-row lg:gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => setIsCopied(false)}
              >
                <div>
                  <ShareIcon className="h-4 w-4" />
                </div>{" "}
                <p> Get Shared Link</p>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Share job link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this job.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue={`${baseUrl}/public/jobs/${job?._id}`}
                    readOnly
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="px-3"
                  onClick={() =>
                    copyToClipboard(`${baseUrl}/public/jobs/${job?._id}`)
                  }
                >
                  <span className="sr-only">
                    {isCopied ? "Copied!" : "Copy"}
                  </span>
                  {isCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Link
            className="block w-full"
            href={`/candidate/find-jobs/${job?._id}`}
          >
            <Button className="w-full">View Job Details</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
