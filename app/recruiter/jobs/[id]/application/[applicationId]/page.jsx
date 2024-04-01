"use client";

import APIKit from "@/common/APIkit";
import { ApplicationStatus } from "@/common/KeyChain";
import { formatDate, formatText, generateAge } from "@/common/UtilKit";
import SelectField from "@/components/form/SelectField";
import Container from "@/components/shared/Container";
import { Card } from "@/components/ui/card";
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  EnvelopeIcon,
  InboxStackIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ApplicationDetails({ params }) {
  const { id: jobId, applicationId } = params;

  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`/we/job/${jobId}/application/${applicationId}`],
    queryFn: () =>
      APIKit.we.job.application
        .getSingleApplication(jobId, applicationId)
        .then(({ data }) => data),
    enable: !!jobId && !!applicationId,
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Container>
      <div
        className="mb-3 flex w-fit cursor-pointer items-center gap-1 text-sm font-medium"
        onClick={router.back}
      >
        <ArrowLeft className="h-4 w-4 text-primary" /> Go Back
      </div>

      <div className="grid gap-5 md:grid-cols-12">
        <Card className="h-fit !p-5 md:col-span-4 xl:col-span-3">
          <div class="space-y-6">
            <div class="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-full border border-border">
                  <Image
                    src={data.user.image_url}
                    width={100}
                    height={100}
                    alt="candidate-image"
                    className="h-12 w-12 object-cover"
                  />
                </div>

                <div>
                  <p className="text-left font-semibold text-primary">
                    {data.user?.name?.first_name && data.user?.name?.last_name
                      ? `${
                          data.user.name.first_name +
                          " " +
                          data.user.name.last_name
                        }`
                      : "Name not set"}
                  </p>
                  <p className="text-sm lowercase text-primary first-letter:uppercase">
                    {data.candidate?.gender || "Gender not set"} &bull;{" "}
                    {data.candidate?.date_of_birth
                      ? generateAge(data.candidate?.date_of_birth)
                      : "Age not set"}
                  </p>
                </div>
              </div>

              <div>
                <p>Applied on {formatDate(data.createdAt)}</p>

                <SelectField
                  options={ApplicationStatus}
                  value={ApplicationStatus.find(
                    (el) => el.value === data?.status,
                  )}
                  onChange={(selectedOption) => {
                    // router.push(selectedOption.value);
                    console.log(selectedOption);
                  }}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-8 xl:col-span-9">
          {/* information about the candidate */}
          <div>
            <div>
              <h2 class="text-base font-semibold text-primary">
                About Candidate
              </h2>
            </div>
            <div class="space-y-2 pt-4">
              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div class="flex items-start gap-3">
                  <div>
                    <EnvelopeIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
                  </div>
                  <div>
                    <h1 class="text-sm font-medium text-primary">
                      Email Address
                    </h1>
                    {data?.user?.email ? (
                      <Link
                        href={`mailto:${data?.user?.email}`}
                        class="text-base font-medium text-primary"
                      >
                        {data?.user?.email}
                      </Link>
                    ) : (
                      <p class="text-base font-medium text-primary">Not set</p>
                    )}
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div>
                    <PhoneIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
                  </div>
                  <div>
                    <h1 class="text-sm font-medium text-primary">Phone</h1>
                    <p class="text-base font-medium text-primary">
                      {data?.phone ? (
                        <Link
                          href={`tel:${data?.phone}`}
                          class="text-base font-medium text-primary"
                        >
                          {data?.phone}
                        </Link>
                      ) : (
                        <p class="text-base font-medium text-primary">
                          Not set
                        </p>
                      )}
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div>
                    <BriefcaseIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
                  </div>
                  <div>
                    <h1 class="text-sm font-medium text-primary">
                      Work Experience
                    </h1>
                    <p class="text-base font-medium text-primary">
                      {data?.years_of_experience !== undefined
                        ? data?.years_of_experience < 1
                          ? "0 year"
                          : data?.years_of_experience === 1
                          ? "1 year"
                          : data?.years_of_experience + " years"
                        : "Not set"}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div>
                    <BuildingOffice2Icon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
                  </div>
                  <div>
                    <h1 class="text-sm font-medium text-primary">
                      Current Company
                    </h1>
                    <p class="text-base font-medium text-primary">
                      {data?.current_company || "Not Provided"}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div>
                    <InboxStackIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
                  </div>
                  <div>
                    <h1 class="text-sm font-medium text-primary">
                      Current Role
                    </h1>
                    <p class="text-base font-medium text-primary">
                      {data?.current_role || "Not Provided"}
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div>
                    <CalendarIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
                  </div>
                  <div>
                    <h3 class="text-base font-medium text-primary">
                      Date of Birth
                    </h3>
                    <span class="text-base font-medium">
                      {data?.candidate?.date_of_birth
                        ? formatDate(data?.candidate?.date_of_birth)
                        : "Not Set"}
                    </span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div>
                    <MapPinIcon className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary" />
                  </div>
                  <div>
                    <h1 class="text-sm font-medium text-primary">Location</h1>
                    <p class="text-base font-medium text-primary">
                      {data?.candidate?.location || "Not Provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
