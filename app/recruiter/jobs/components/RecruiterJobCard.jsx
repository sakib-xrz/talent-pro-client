import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { EyeIcon, ShareIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Check, CopyIcon } from "lucide-react";
import { toast } from "sonner";

import APIKit from "@/common/APIkit";
import { JobOptions } from "@/common/KeyChain";
import { formatText, getBaseUrl, getTimeDifference } from "@/common/UtilKit";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectField from "@/components/form/SelectField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecruiterJobCard({ job, refetch }) {
  const [isCopied, setIsCopied] = useState(false);

  const baseUrl = getBaseUrl();

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      toast.success("Job link copied to clipboard");
    } catch (err) {
      console.error("Error copying to clipboard:", err);
    }
  };

  const handleUpdateJobStatus = (uid, SelectedOption) => {
    const status = SelectedOption.value;

    const handleSuccess = () => {
      refetch();
    };

    const handleFailure = (error) => {
      console.log(error);
      throw error;
    };

    const promise = APIKit.job
      .updateJobStatus(uid, { status })
      .then(handleSuccess)
      .catch(handleFailure);

    return toast.promise(promise, {
      loading: "Loading...",
      success: "Job status update successful!",
      error: "Something went wrong!",
    });
  };

  return (
    <Card className={"space-y-3"}>
      <div className="flex flex-col justify-between gap-2 xs:flex-row md:flex-col lg:flex-row lg:items-center">
        <p className="text-sm font-medium">
          Posted {job?.createdAt ? getTimeDifference(job.createdAt) : "Not set"}
        </p>
        <div className="flex items-center gap-6 ">
          <div className="flex items-center gap-2 text-primary">
            <EyeIcon className="h-5 w-5" />
            <CardDescription>
              {job?.total_views || 0} {job?.total_views > 1 ? "Views" : "View"}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <UsersIcon className="h-5 w-5" />
            <CardDescription>
              {job?.total_applications || 0} Applied
            </CardDescription>
          </div>
        </div>
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
        <SelectField
          options={JobOptions}
          value={JobOptions.find((el) => el.value === job?.status)}
          onChange={(SelectedOption) =>
            handleUpdateJobStatus(job?._id, SelectedOption)
          }
        />
      </div>

      <div>
        <div className="flex flex-col gap-4 lg:flex-row">
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

          <Link className="block w-full" href={`/recruiter/jobs/${job?._id}`}>
            <Button className="w-full">View Job Details</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
