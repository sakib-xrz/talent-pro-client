"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import APIKit from "@/common/APIkit";
import {
  formatDate,
  formatText,
  generateAge,
  generateQueryString,
} from "@/common/UtilKit";
import ApplicationSearchSortFilter from "@/components/application/ApplicationSearchSortFilter";
import Container from "@/components/shared/Container";
import DataTable from "@/components/shared/DataTable";
import EmptyState from "@/components/shared/EpmtyState";
import PageTitleWithButton from "@/components/shared/PageTitleWithButton";
import Pagination from "@/components/shared/Pagination";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

const badgeColor = {
  application_received:
    "text-green-600 bg-green-100 hover:text-green-600 hover:bg-green-100", // Success
  application_in_review:
    "text-sky-600 bg-sky-100 hover:text-sky-600 hover:bg-sky-100", // Info
  shortlisted_for_interview:
    "text-sky-600 bg-sky-100 hover:text-sky-600 hover:bg-sky-100", // Info
  interview_scheduled:
    "text-sky-600 bg-sky-100 hover:text-sky-600 hover:bg-sky-100", // Info
  interview_completed:
    "text-green-600 bg-green-100 hover:text-green-600 hover:bg-green-100", // Success
  hired: "text-green-600 bg-green-100 hover:text-green-600 hover:bg-green-100", // Success
  interview_rescheduled:
    "text-sky-600 bg-sky-100 hover:text-sky-600 hover:bg-sky-100", // Info
  interview_canceled:
    "text-red-600 bg-red-100 hover:text-red-600 hover:bg-red-100", // Error
  not_selected: "text-red-600 bg-red-100 hover:text-red-600 hover:bg-red-100", // Error
};

export default function RecruiterApplications() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "descending",
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "10",
  });

  const queryString = generateQueryString(params);

  useEffect(() => {
    router.push(queryString);
  }, [queryString, router]);

  const { data: applications, isLoading } = useQuery({
    queryKey: [`/we/job/applications${queryString}`],
    queryFn: () =>
      APIKit.we.job.application
        .getAllApplicationForOrg(queryString)
        .then((data) => data),
  });

  const getDynamicEmptyStateTitle = () => {
    let title = "";
    if (params.search.length > 0) {
      return (title = `Couldn't find any application which job title is "${params.search}"`);
    }
    return "Couldn't find any applications";
  };

  const tableColumns = [
    {
      title: <p className="text-center">#</p>,
      renderer: (_, rowIndex) => (
        <p className="text-center font-semibold">{rowIndex + 1}</p>
      ),
    },
    {
      title: "Applicant",
      renderer: (data) => (
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border">
            <Image
              src={data.user.image_url}
              width={48}
              height={48}
              alt="user-image"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-left font-semibold">
              {data.user?.name?.first_name && data.user?.name?.last_name
                ? `${
                    data.user.name.first_name + " " + data.user.name.last_name
                  }`
                : "Name not set"}
            </p>
            <p className="font-medium lowercase first-letter:uppercase">
              {data.candidate?.gender || "Gender not set"},{" "}
              {data.candidate?.date_of_birth
                ? generateAge(data.candidate?.date_of_birth)
                : "Age not set"}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Applied for",
      renderer: (data) => (
        <p>{data?.job?.job_title || "Job title not available"}</p>
      ),
    },
    {
      title: "Applied on",
      renderer: (data) => formatDate(data?.createdAt) || "Not available",
    },
    {
      title: "Contact Information",
      renderer: (data) => (
        <div onClick={(e) => e.stopPropagation()}>
          {data.user?.email ? (
            <Link
              href={`mailto:${data.user.email}`}
              className="line-clamp-1 hover:underline"
            >
              {data.user.email}
            </Link>
          ) : (
            <p className="line-clamp-1">Email not set</p>
          )}
          {data?.phone ? (
            <Link
              href={`tel:${data.phone}`}
              className="line-clamp-1 hover:underline"
            >
              {data.phone}
            </Link>
          ) : (
            <p className="line-clamp-1">Phone not set</p>
          )}
        </div>
      ),
    },
    {
      title: "Resume",
      renderer: (data) =>
        data?.resume ? (
          <div onClick={(e) => e.stopPropagation()}>
            <Link
              href={data.resume}
              className="cursor-pointer font-semibold underline "
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </Link>
          </div>
        ) : (
          "Resume not provided"
        ),
    },
    {
      title: "Experience",
      renderer: (data) =>
        data?.years_of_experience < 1
          ? `${data?.years_of_experience} Year`
          : `${data?.years_of_experience} Years` || "0 Year",
    },
    {
      title: "Expected Salary",
      renderer: (data) => (
        <p>
          ৳ {data.candidate?.desired_salary?.min || 0} - ৳{" "}
          {data.candidate?.desired_salary?.max || 0}
        </p>
      ),
    },
    {
      title: "Status",
      renderer: (data) => (
        <Badge
          size="lg"
          className={`${badgeColor[data?.status]} hover:cursor-default`}
        >
          {formatText(data?.status)}
        </Badge>
      ),
    },
  ];

  return (
    <Container>
      <div className="space-y-4">
        <PageTitleWithButton title={"All Applicants"} />

        <ApplicationSearchSortFilter
          params={params}
          setParams={setParams}
          searchPlaceholder={
            "Search by applicant name, email, phone or job title..."
          }
        />

        {isLoading ? (
          <div>Loading...</div>
        ) : applications?.meta?.total ? (
          <div className="space-y-4">
            <DataTable
              cols={tableColumns}
              data={applications.data}
              wrapperClassName="max-h-[calc(100vh-200px)] whitespace-nowrap font-medium"
              theadClassName="sticky top-0 z-10"
              isClickable={true}
              handleTableRowClick={(row) =>
                router.push(
                  `/recruiter/jobs/${row?.job?._id}/application/${row._id}`,
                )
              }
            />
            <Pagination
              params={params}
              setParams={setParams}
              dataLength={applications.meta.total}
            />
          </div>
        ) : (
          <EmptyState
            src="/empty/application-empty.svg"
            title={getDynamicEmptyStateTitle()}
            helperText="Once we found, you will see a list of applications."
          />
        )}
      </div>
    </Container>
  );
}
