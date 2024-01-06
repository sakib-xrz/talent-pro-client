"use client";

import Container from "@/components/shared/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import banner_side from "@/public/images/job-details-side-image.png";
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import APIKit from "@/common/APIkit";
import { formatText } from "@/common/UtilKit";

export default function CandidateJobDetails({ params: { id } }) {
  const { data: job, isLoading } = useQuery({
    queryKey: [`/find-jobs/${id}`],
    queryFn: () => APIKit.job.getSingleJob(id).then((data) => data.data),
    enabled: !!id,
  });

  if (isLoading) {
    return "Loading...";
  }

  const { job_description } = job;

  return (
    <div>
      <div className="bg-[url('/images/job-details-banner.png')] bg-cover">
        <Container>
          <Link
            href="/candidate/find-jobs"
            className="flex w-fit items-center gap-2 border-b border-transparent py-1 font-medium text-primary hover:border-primary"
          >
            <ArrowLeftIcon className="h-5 w-5 " />
            <p>Go Back to Jobs</p>
          </Link>

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
                      Job temporarily on hold. Save this opportunity for future
                      updates.
                    </p>
                  </p>
                </div>
              )}

              <div className="flex w-full items-center justify-center gap-2 md:justify-start">
                <Button variant="outline" className="hover:bg-white">
                  Save Job
                </Button>
                <Link
                  href={`/candidate/find-jobs/${id}/apply`}
                  className="w-fit"
                >
                  <Button>Apply Now</Button>
                </Link>
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
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-8/12">
            <Card className="space-y-5">
              <h4 className="line-clamp-1 text-lg font-semibold text-primary sm:line-clamp-none">
                About this role
              </h4>
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
                    {job?.job_title || "Job title not set"}
                  </h3>
                  <CardDescription className="line-clamp-1 lg:line-clamp-none">
                    {job?.organization?.company_name || "Company name not set"}{" "}
                    • {job?.address || "Job location not set"}
                  </CardDescription>
                </div>
              </div>

              <hr />

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
                    Experience Level
                  </h3>
                  <p className="line-clamp-1 text-sm lg:line-clamp-none">
                    {job?.experience_level
                      ? `${formatText(job?.experience_level)} level`
                      : "Job level not set"}
                  </p>
                </div>
                <div>
                  <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
                    Job Type
                  </h3>
                  <p className="line-clamp-1 text-sm lg:line-clamp-none">
                    {job?.job_type
                      ? `${formatText(job?.job_type)}`
                      : "Job type not set"}
                  </p>
                </div>
                <div>
                  <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
                    Location Type
                  </h3>
                  <p className="line-clamp-1 text-sm lg:line-clamp-none">
                    {job?.location_type
                      ? `${formatText(job?.location_type)}`
                      : "Location type not set"}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
                  Required Skills
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {job?.required_skills?.length
                    ? job?.required_skills.map((skill) => (
                        <Badge variant="secondary" size="lg" key={skill._id}>
                          {skill.label}
                        </Badge>
                      ))
                    : "No skill required"}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
                    Working Days
                  </h3>
                  <p className="line-clamp-1 text-sm lg:line-clamp-none">
                    {job?.start_day
                      ? formatText(job?.start_day)
                      : "Start day not set"}{" "}
                    -{" "}
                    {job?.end_day
                      ? formatText(job?.end_day)
                      : "End day not set"}
                  </p>
                </div>
                <div>
                  <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
                    Working Hours
                  </h3>
                  <p className="line-clamp-1 text-sm lg:line-clamp-none">
                    {job?.working_hours
                      ? `${parseInt(job?.working_hours)} hours`
                      : "Working hours not set"}
                  </p>
                </div>
                <div>
                  <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
                    Minimum Experience
                  </h3>
                  <p className="line-clamp-1 text-sm lg:line-clamp-none">
                    {job?.years_of_experience || "Not set"} year
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
                    Number of Vacancy
                  </h3>
                  <p className="line-clamp-1 text-sm lg:line-clamp-none">
                    {job?.num_of_vacancy || "Not set"}
                  </p>
                </div>
                <div>
                  <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
                    Deadline
                  </h3>
                  <p className="line-clamp-1 text-sm lg:line-clamp-none">
                    12 January, 2024
                  </p>
                </div>
                <div>
                  <h3 className="line-clamp-1 font-semibold text-primary sm:line-clamp-none">
                    Salary or Compensation
                  </h3>
                  <p className="line-clamp-1 text-sm lg:line-clamp-none">
                    ৳20,000 - ৳50,000
                  </p>
                </div>
              </div>

              <hr />

              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: job_description }}
              />
            </Card>
          </div>
          <div className="w-full space-y-2 lg:w-4/12">
            <Card className="space-y-5 lg:sticky lg:top-24 ">
              <h4 className="line-clamp-1 text-lg font-semibold text-primary sm:line-clamp-none">
                About company
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-start gap-4">
                  <GlobeAltIcon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm">Website</p>
                    <a
                      href={job?.organization?.website || "#"}
                      target="_blank"
                      className="text-md cursor-pointer font-semibold text-primary underline underline-offset-2"
                    >
                      {job?.organization?.website || "Not set"}
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <MapPinIcon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm">Location</p>
                    <p className="text-md truncate font-semibold text-primary">
                      {job?.organization?.company_location || "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <BriefcaseIcon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm">Industry</p>
                    <p className="text-md font-semibold text-primary">
                      {job?.organization?.industry
                        ? formatText(job?.organization?.industry)
                        : "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <BuildingOffice2Icon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm">Company Size</p>
                    <p className="text-md font-semibold text-primary">
                      {job?.organization?.company_size
                        ? `${job?.organization?.company_size} people`
                        : "Not set"}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Link
                  href={`/candidate/find-jobs/${id}/apply`}
                  className="w-full"
                >
                  <Button className="w-full">Apply Now</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
