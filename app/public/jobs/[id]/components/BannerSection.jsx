import Image from "next/image";
import Link from "next/link";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

import banner_side from "@/public/images/job-details-side-image.png";

import { Button } from "@/components/ui/button";
import Container from "@/components/shared/Container";

export default function BannerSection({ job, id }) {
  return (
    <Container>
      <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row md:gap-8 ">
        <div className="flex w-full flex-col gap-3 text-center md:gap-6 md:text-left">
          <div className="space-y-3 text-primary">
            <p className="text-2xl font-semibold lg:text-4xl">
              {job?.job_title || "Job title not set"} <span>at</span>{" "}
              <span className="capitalize">
                {job?.organization?.company_name || "Company name not set"}
              </span>
            </p>
            <p className="mx-auto max-w-xl text-sm md:mx-0 lg:text-base">
              {job?.organization?.about_us || "About company not set"}
            </p>
          </div>

          {job?.status === "ON_HOLD" && (
            <div className="flex justify-center md:justify-start">
              <p className="text-md flex w-fit gap-2 rounded-md bg-yellow-100 px-2 py-1 text-left font-medium text-yellow-500 lg:items-center">
                <div>
                  <ExclamationTriangleIcon className="mt-0.5 h-3 w-3 lg:mt-0 lg:h-3.5 lg:w-3.5" />
                </div>
                <p className="text-xs lg:text-sm">
                  Job temporarily on hold. You can't apply right now.
                </p>
              </p>
            </div>
          )}

          <div className="flex w-full items-center justify-center gap-2 md:justify-start">
            {job?.status === "ON_HOLD" ? (
              <Button disabled>Apply Now</Button>
            ) : (
              <Link href={`/candidate/find-jobs/${id}/apply`} className="w-fit">
                <Button>Apply Now</Button>
              </Link>
            )}
          </div>
        </div>
        <Image
          alt=""
          src={banner_side}
          placeholder="blur"
          className="w-auto"
          quality={100}
        />
      </div>
    </Container>
  );
}
